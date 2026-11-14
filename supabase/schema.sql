-- ==============================================================================
-- Z NATURALS - Supabase Production Schema & Row Level Security (RLS) Script
-- Run this entire script in Supabase SQL Editor (Dashboard -> SQL Editor -> New Query)
-- ==============================================================================

-- 1. PROFILES TABLE (Stores customer metadata, phone, saved delivery addresses)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  name text,
  phone text,
  addresses jsonb default '[]'::jsonb,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- Enable RLS for profiles
alter table public.profiles enable row level security;

-- Profiles Policies
create policy "Users can view their own profile" 
  on public.profiles for select 
  using (auth.uid() = id);

create policy "Users can update their own profile" 
  on public.profiles for update 
  using (auth.uid() = id);

create policy "Users can insert their own profile" 
  on public.profiles for insert 
  with check (auth.uid() = id);

-- Trigger to automatically create a profile record when a new user signs up (via Google or Email OTP)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, phone)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'phone', new.phone, '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 2. ORDERS TABLE (Stores customer orders, Karaikudi COD, and Instant UPI details)
create table if not exists public.orders (
  id text primary key, -- e.g. 'ZN-KRI-1085'
  user_id uuid references auth.users(id) on delete set null, -- null for Express Guest Checkout
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  is_guest boolean default false not null,
  pincode text not null,
  city text not null,
  state text not null,
  address text not null,
  landmark text,
  delivery_slot text,
  payment_method text not null, -- 'Cash on Delivery (COD)' or 'Online UPI'
  upi_transaction_id text, -- 12-digit UTR number from GPay/PhonePe
  payment_status text default 'pending' not null, -- 'pending', 'verified', 'paid'
  order_status text default 'pending' not null, -- 'pending', 'out_for_delivery', 'delivered', 'cancelled'
  subtotal numeric not null,
  shipping_fee numeric default 0 not null,
  grand_total numeric not null,
  total_weight_grams integer default 0,
  notes text,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- Enable RLS for orders
alter table public.orders enable row level security;

-- Orders Policies
-- a) Authenticated users can only view their own orders
create policy "Authenticated customers can view their own orders"
  on public.orders for select
  using (auth.uid() = user_id);

-- b) Anyone (both logged-in users and guest customers) can create a new order during checkout
create policy "Customers and guests can insert orders"
  on public.orders for insert
  with check (true);

-- c) Store administrators can view and manage all orders (for Karaikudi delivery dispatch)
create policy "Admin can view all orders"
  on public.orders for select
  using (
    auth.jwt() ->> 'email' in ('care@znaturals.in', 'admin@znaturals.in')
    or (auth.jwt() ->> 'role' = 'service_role')
  );

create policy "Admin can update order status and payments"
  on public.orders for update
  using (
    auth.jwt() ->> 'email' in ('care@znaturals.in', 'admin@znaturals.in')
    or (auth.jwt() ->> 'role' = 'service_role')
  );


-- 3. ORDER ITEMS TABLE (Stores line items for each order)
create table if not exists public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id text references public.orders(id) on delete cascade not null,
  product_id text not null,
  product_name text not null,
  product_volume text,
  quantity integer not null check (quantity > 0),
  price numeric not null,
  total_price numeric not null,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- Enable RLS for order_items
alter table public.order_items enable row level security;

-- Order Items Policies
-- a) Customers can view items for their own orders
create policy "Customers can view items of their own orders"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders
      where public.orders.id = public.order_items.order_id
      and (public.orders.user_id = auth.uid())
    )
  );

-- b) Anyone can insert order items when placing an order
create policy "Anyone can insert order items"
  on public.order_items for insert
  with check (true);

-- c) Admin can view all order items
create policy "Admin can view all order items"
  on public.order_items for select
  using (
    auth.jwt() ->> 'email' in ('care@znaturals.in', 'admin@znaturals.in')
    or (auth.jwt() ->> 'role' = 'service_role')
  );

-- 4. HELPER INDEXES (For fast queries)
create index if not exists idx_orders_user_id on public.orders(user_id);
create index if not exists idx_orders_pincode on public.orders(pincode);
create index if not exists idx_orders_created_at on public.orders(created_at desc);
create index if not exists idx_order_items_order_id on public.order_items(order_id);
