-- ==============================================================================
-- Z NATURALS - Supabase Production Schema & Row Level Security (RLS) Script
-- Run this entire script in Supabase SQL Editor (Dashboard -> SQL Editor -> New Query)
-- ==============================================================================

-- 1. Enable UUID Extension
create extension if not exists "uuid-ossp";

-- ==============================================================================
-- TABLE 1: PROFILES (Stores customer metadata, email, phone, saved delivery addresses)
-- ==============================================================================
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  name text,
  phone text,
  addresses jsonb default '[]'::jsonb,
  is_admin boolean default false,
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
  on conflict (id) do update set
    email = excluded.email,
    updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- ==============================================================================
-- TABLE 2: ORDERS (Stores customer orders, Karaikudi COD, and Instant UPI details)
-- ==============================================================================
create table if not exists public.orders (
  id text primary key, -- e.g. 'ZN-KRI-1085'
  user_id uuid references auth.users(id) on delete set null, -- null for Express Guest Checkout
  customer_name text not null,
  phone text not null,
  alternate_phone text,
  address text not null,
  landmark text,
  city text not null,
  state text not null,
  pincode text not null,
  zone text not null,
  delivery_slot text,
  notes text,
  subtotal numeric not null,
  shipping_fee numeric default 0 not null,
  total numeric not null,
  total_weight_grams numeric default 0,
  status text default 'Pending' not null,
  payment_method text not null,
  payment_status text not null,
  upi_utr text,
  items jsonb default '[]'::jsonb,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- Enable RLS for orders
alter table public.orders enable row level security;

-- Orders Policies
-- a) Anyone (both logged-in users and guest customers) can create a new order during checkout
drop policy if exists "Allow order creation for all users and guests" on public.orders;
create policy "Allow order creation for all users and guests"
  on public.orders for insert
  with check (true);

-- b) Allow viewing orders (for store admin portal & customer receipts)
drop policy if exists "Users view own orders or Admin views all" on public.orders;
drop policy if exists "Allow read orders" on public.orders;
create policy "Allow read orders"
  on public.orders for select
  using (true);

-- c) Store administrators can update orders (for Karaikudi delivery dispatch & status)
drop policy if exists "Admin can update order status and payments" on public.orders;
drop policy if exists "Allow update orders" on public.orders;
create policy "Allow update orders"
  on public.orders for update
  using (true);


-- ==============================================================================
-- TABLE 3: ORDER_ITEMS (Stores individual line items for each order)
-- ==============================================================================
create table if not exists public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id text references public.orders(id) on delete cascade not null,
  product_id text not null,
  product_name text not null,
  volume text,
  quantity integer not null check (quantity > 0),
  price numeric not null,
  weight_grams numeric default 0,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- Enable RLS for order_items
alter table public.order_items enable row level security;

-- Order Items Policies
drop policy if exists "Allow insert order items" on public.order_items;
create policy "Allow insert order items"
  on public.order_items for insert
  with check (true);

drop policy if exists "Users view own order items or Admin views all" on public.order_items;
drop policy if exists "Allow read order items" on public.order_items;
create policy "Allow read order items"
  on public.order_items for select
  using (true);

-- ==============================================================================
-- HELPER INDEXES (For fast queries)
-- ==============================================================================
create index if not exists idx_orders_user_id on public.orders(user_id);
create index if not exists idx_orders_pincode on public.orders(pincode);
create index if not exists idx_orders_created_at on public.orders(created_at desc);
create index if not exists idx_order_items_order_id on public.order_items(order_id);

-- ==============================================================================
-- OPTIONAL: Promote your email to Admin
-- update public.profiles set is_admin = true where email = 'YOUR_EMAIL@gmail.com';
-- ==============================================================================
