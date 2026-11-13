import React, { useState } from 'react';
import { 
  ClipboardList, 
  Truck, 
  CheckCircle2, 
  Clock, 
  RotateCcw, 
  Phone, 
  MapPin, 
  Search, 
  Calendar, 
  ArrowLeft,
  Users,
  Printer,
  ChevronDown,
  DollarSign
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { OrderStatus } from '../types';
import { BrandLogo } from './BrandLogo';

export const AdminDashboard: React.FC = () => {
  const { orders, updateOrderStatus, waitlist, setCurrentView } = useStore();

  const [statusFilter, setStatusFilter] = useState<'All' | OrderStatus | 'Waitlist'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Metrics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'Pending').length;
  const outForDeliveryOrders = orders.filter((o) => o.status === 'Out for Delivery').length;
  const deliveredOrders = orders.filter((o) => o.status === 'Delivered').length;
  const totalRevenue = orders
    .filter((o) => o.status !== 'Returned')
    .reduce((sum, o) => sum + o.total, 0);

  // Filtered orders
  const filteredOrders = orders.filter((order) => {
    if (statusFilter !== 'All' && statusFilter !== 'Waitlist' && order.status !== statusFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = order.customerName.toLowerCase().includes(q);
      const matchPhone = order.phone.includes(q);
      const matchId = order.id.toLowerCase().includes(q);
      const matchAddress = order.address.toLowerCase().includes(q);
      const matchPincode = order.pincode.includes(q);
      return matchName || matchPhone || matchId || matchAddress || matchPincode;
    }
    return true;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Out for Delivery':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Returned':
        return 'bg-rose-100 text-rose-900 border-rose-300';
    }
  };

  const handlePrintSheet = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-botanical-ivory text-charcoal pb-20">
      
      {/* Top Admin Header */}
      <header className="bg-deep-forest text-botanical-ivory py-4 px-4 sm:px-6 lg:px-8 border-b border-champagne-gold/40 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentView('store')}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4 text-champagne-gold" />
              <span>Back to Store</span>
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-bold text-xl sm:text-2xl">
                  Karaikudi COD Delivery Management
                </h1>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded-full font-bold">
                  Daily 8 AM – 4 PM
                </span>
              </div>
              <p className="text-xs text-botanical-ivory/70 mt-0.5">
                Internal Dispatch & Doorstep Order Settlement Panel
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrintSheet}
              className="px-3.5 py-2 rounded-xl bg-champagne-gold text-deep-forest font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:bg-gold-light transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Dispatch Sheet</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-2xl bg-soft-white border border-warm-sand shadow-sm">
            <div className="flex items-center justify-between text-xs text-charcoal/60 font-semibold uppercase tracking-wider">
              <span>Total Orders</span>
              <ClipboardList className="w-4 h-4 text-deep-forest" />
            </div>
            <div className="font-sans font-extrabold text-2xl sm:text-3xl text-deep-forest mt-2">
              {totalOrders}
            </div>
            <div className="text-[11px] text-sage-green font-medium mt-1">
              All Karaikudi Free COD bookings
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-soft-white border border-warm-sand shadow-sm">
            <div className="flex items-center justify-between text-xs text-charcoal/60 font-semibold uppercase tracking-wider">
              <span>Pending Dispatch</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="font-sans font-extrabold text-2xl sm:text-3xl text-amber-800 mt-2">
              {pendingOrders}
            </div>
            <div className="text-[11px] text-amber-700 font-medium mt-1">
              Awaiting delivery boy pickup
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-soft-white border border-warm-sand shadow-sm">
            <div className="flex items-center justify-between text-xs text-charcoal/60 font-semibold uppercase tracking-wider">
              <span>Out for Delivery</span>
              <Truck className="w-4 h-4 text-blue-600" />
            </div>
            <div className="font-sans font-extrabold text-2xl sm:text-3xl text-blue-800 mt-2">
              {outForDeliveryOrders}
            </div>
            <div className="text-[11px] text-blue-700 font-medium mt-1">
              Active in Karaikudi street vans
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-soft-white border border-warm-sand shadow-sm">
            <div className="flex items-center justify-between text-xs text-charcoal/60 font-semibold uppercase tracking-wider">
              <span>Delivered & Collected</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-sans font-extrabold text-2xl sm:text-3xl text-emerald-800 mt-2">
              ₹{totalRevenue}
            </div>
            <div className="text-[11px] text-emerald-700 font-medium mt-1">
              {deliveredOrders} completed orders
            </div>
          </div>

        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-soft-white border border-warm-sand">
          
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            {(['All', 'Pending', 'Out for Delivery', 'Delivered', 'Returned', 'Waitlist'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-2 rounded-xl transition-all ${
                  statusFilter === st
                    ? 'bg-deep-forest text-botanical-ivory shadow-sm'
                    : 'bg-botanical-ivory text-charcoal hover:bg-warm-sand/50'
                }`}
              >
                {st === 'Waitlist' ? `Non-Karaikudi Leads (${waitlist.length})` : st}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-charcoal/50 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by customer name, phone, pincode..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-botanical-ivory border border-warm-sand text-xs focus:outline-none focus:ring-1 focus:ring-deep-forest"
            />
          </div>

        </div>

        {/* Orders Table or Waitlist View */}
        {statusFilter === 'Waitlist' ? (
          /* Non-Karaikudi WhatsApp Waitlist Leads */
          <div className="bg-soft-white rounded-3xl border border-warm-sand overflow-hidden shadow-sm">
            <div className="p-5 border-b border-warm-sand bg-botanical-ivory/60 flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-lg text-deep-forest">
                  Pan-India & Chennai Expansion Waitlist
                </h3>
                <p className="text-xs text-charcoal/70">
                  Customers who checked non-Karaikudi pincodes and requested WhatsApp launch notifications.
                </p>
              </div>
              <span className="text-xs font-bold bg-champagne-gold/20 text-deep-forest px-3 py-1 rounded-full border border-champagne-gold/40">
                {waitlist.length} Interested Customers
              </span>
            </div>

            <div className="divide-y divide-warm-sand/50">
              {waitlist.map((lead) => (
                <div key={lead.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-sage-green" />
                      <span className="font-bold text-deep-forest text-sm">+91 {lead.phone}</span>
                      <span className="text-xs text-charcoal/60">({lead.city || 'Other Area'})</span>
                    </div>
                    <div className="text-xs text-charcoal/70">
                      Pincode: <span className="font-mono font-semibold">{lead.pincode}</span> • Requested on {new Date(lead.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/91${lead.phone}?text=Hello!%20Z%20NATURALS%20is%20preparing%20to%20deliver%20to%20your%20area%20(${lead.pincode}).`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 flex items-center gap-1.5"
                  >
                    Send WhatsApp Update
                  </a>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Karaikudi COD Orders List */
          <div className="bg-soft-white rounded-3xl border border-warm-sand overflow-hidden shadow-sm">
            
            <div className="p-5 border-b border-warm-sand bg-botanical-ivory/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-serif font-bold text-lg text-deep-forest">
                  Karaikudi COD Deliveries ({filteredOrders.length})
                </h3>
                <p className="text-xs text-charcoal/70">
                  Update daily delivery status (8:00 AM – 4:00 PM) to notify riders and settle cash collections.
                </p>
              </div>
              <span className="text-xs text-charcoal/60">
                Delivery Window: <strong>8:00 AM – 4:00 PM Daily</strong>
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-botanical-ivory text-deep-forest border-b border-warm-sand uppercase tracking-wider font-bold">
                  <tr>
                    <th className="py-3 px-4">Order ID & Time</th>
                    <th className="py-3 px-4">Customer Details</th>
                    <th className="py-3 px-4">Address & Pincode</th>
                    <th className="py-3 px-4">Daily Slot</th>
                    <th className="py-3 px-4">Items & COD Amount</th>
                    <th className="py-3 px-4">Status & Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-sand/50">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-charcoal/60 text-sm">
                        No orders match the current filter.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-botanical-ivory/30 transition-colors">
                        
                        {/* ID & Time */}
                        <td className="py-4 px-4 align-top">
                          <span className="font-mono font-bold text-deep-forest text-xs block">
                            {order.id}
                          </span>
                          <span className="text-[10px] text-charcoal/50 block mt-0.5">
                            {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </td>

                        {/* Customer */}
                        <td className="py-4 px-4 align-top">
                          <div className="font-bold text-deep-forest text-sm">
                            {order.customerName}
                          </div>
                          <div className="flex items-center gap-1.5 mt-1 text-charcoal/80">
                            <Phone className="w-3 h-3 text-sage-green" />
                            <a href={`tel:${order.phone}`} className="hover:underline font-mono">
                              {order.phone}
                            </a>
                          </div>
                          {order.alternatePhone && (
                            <div className="text-[10px] text-charcoal/50">
                              Alt: {order.alternatePhone}
                            </div>
                          )}
                        </td>

                        {/* Address & Pincode */}
                        <td className="py-4 px-4 align-top max-w-xs">
                          <div className="flex items-start gap-1">
                            <MapPin className="w-3.5 h-3.5 text-sage-green flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="font-medium text-charcoal/90 leading-relaxed">
                                {order.address}
                              </div>
                              {order.landmark && (
                                <div className="text-[11px] text-charcoal/60 mt-0.5">
                                  Landmark: {order.landmark}
                                </div>
                              )}
                              <span className="inline-block mt-1 font-mono font-bold text-[11px] bg-warm-sand/40 text-deep-forest px-1.5 py-0.5 rounded">
                                Pincode: {order.pincode} (Karaikudi)
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Delivery Slot */}
                        <td className="py-4 px-4 align-top">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-botanical-ivory border border-warm-sand text-[11px] font-semibold text-deep-forest">
                            <Clock className="w-3 h-3 text-champagne-gold" />
                            {order.deliverySlot}
                          </span>
                        </td>

                        {/* Items & Total */}
                        <td className="py-4 px-4 align-top">
                          <div className="font-extrabold text-sm text-deep-forest font-sans">
                            ₹{order.total} <span className="text-[10px] font-normal text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded">COD</span>
                          </div>
                          <div className="space-y-0.5 mt-1 text-[11px] text-charcoal/70">
                            {order.items.map((it, idx) => (
                              <div key={idx} className="truncate max-w-[180px]">
                                {it.quantity}x {it.productName}
                              </div>
                            ))}
                          </div>
                        </td>

                        {/* Status Updater */}
                        <td className="py-4 px-4 align-top">
                          <div className="space-y-2">
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border uppercase tracking-wider ${getStatusBadge(order.status)}`}>
                              {order.status}
                            </span>

                            {/* Status Change Dropdown */}
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                              className="block w-full text-xs bg-white border border-warm-sand rounded-lg px-2 py-1 font-medium text-deep-forest focus:outline-none focus:ring-1 focus:ring-deep-forest"
                            >
                              <option value="Pending">Mark: Pending</option>
                              <option value="Out for Delivery">Mark: Out for Delivery</option>
                              <option value="Delivered">Mark: Delivered</option>
                              <option value="Returned">Mark: Returned</option>
                            </select>
                          </div>
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </main>

    </div>
  );
};
