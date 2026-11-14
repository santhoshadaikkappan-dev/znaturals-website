import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Download, 
  Printer, 
  Search, 
  RefreshCw, 
  ShoppingBag, 
  Truck, 
  CheckCircle, 
  Clock, 
  IndianRupee,
  Lock,
  ArrowRight
} from 'lucide-react';
import { downloadOrdersCSV } from '../utils/googleSheetsSync';
import { printSingleOrderSlip } from '../utils/printOrder';
import { Order } from '../types';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'karaikudi' | 'paid' | 'cod'>('all');

  // Load orders when authenticated
  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchAdminOrders();
    }
  }, [isOpen, isAuthenticated]);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === '1749') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const printSingleOrder = (ord: Order) => {
    printSingleOrderSlip(ord);
  };

  const fetchAdminOrders = () => {
    setIsLoading(true);
    try {
      const local = JSON.parse(localStorage.getItem('zn_shared_orders') || '[]');
      setOrders(local);
    } catch (err) {
      console.warn("Could not load local orders:", err);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  // Filter orders based on query and filter tab
  const filteredOrders = orders.filter((ord) => {
    if (selectedFilter === 'karaikudi' && !ord.pincode.startsWith('630')) return false;
    if (selectedFilter === 'paid' && ord.paymentStatus !== 'Paid (Online)') return false;
    if (selectedFilter === 'cod' && ord.paymentStatus === 'Paid (Online)') return false;

    if (filterQuery.trim()) {
      const q = filterQuery.toLowerCase();
      const matchName = ord.customerName.toLowerCase().includes(q);
      const matchPhone = ord.phone.includes(q);
      const matchId = ord.id.toLowerCase().includes(q);
      const matchAddress = ord.address.toLowerCase().includes(q);
      return matchName || matchPhone || matchId || matchAddress;
    }
    return true;
  });

  // Calculate high-level summary metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalKaraikudiOrders = orders.filter((o) => o.pincode.startsWith('630')).length;
  const totalPaidOnline = orders.filter((o) => o.paymentStatus === 'Paid (Online)').length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-botanical-ivory rounded-3xl max-w-4xl w-full shadow-2xl border-2 border-champagne-gold/70 overflow-hidden z-10 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-deep-forest text-botanical-ivory flex items-center justify-between border-b border-champagne-gold/40 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-champagne-gold/20 border border-champagne-gold/60 flex items-center justify-center text-champagne-gold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial text-lg text-botanical-ivory leading-tight font-bold">
                Z NATURALS — Store Manager & Order Bills
              </h3>
              <p className="text-[11px] text-champagne-gold font-sans uppercase tracking-wider">
                Private Owner Portal • Karaikudi Dispatch
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-botanical-ivory/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          
          {!isAuthenticated ? (
            /* PIN Protection Screen */
            <div className="max-w-sm mx-auto my-8 p-6 bg-white rounded-2xl border border-warm-sand shadow-sm text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-deep-forest/5 text-deep-forest flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-deep-forest text-lg">Store Owner Access</h4>
                <p className="text-xs text-charcoal/70 mt-1">
                  Enter your 4-digit Store PIN to view customer bills and export to Google Sheets.
                </p>
              </div>

              <form onSubmit={handlePinSubmit} className="space-y-3">
                <input
                  type="password"
                  autoFocus
                  maxLength={10}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter 4-Digit Owner PIN"
                  className="w-full text-center py-3 px-4 rounded-xl border border-warm-sand text-lg font-mono tracking-widest focus:outline-none focus:border-deep-forest"
                />

                {pinError && (
                  <p className="text-xs text-red-600 font-semibold">
                    Incorrect PIN. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-deep-forest text-botanical-ivory font-bold text-xs uppercase tracking-wider hover:bg-deep-forest-dark flex items-center justify-center gap-2 shadow-botanical"
                >
                  <span>Unlock Orders Dashboard</span>
                  <ArrowRight className="w-4 h-4 text-champagne-gold" />
                </button>
              </form>
            </div>
          ) : (
            /* Orders Dashboard */
            <div className="space-y-5">
              
              {/* Summary Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-white border border-warm-sand shadow-xs">
                  <span className="text-[11px] font-bold text-charcoal/60 uppercase block">Total Orders</span>
                  <span className="text-xl font-bold text-deep-forest font-mono">{orders.length}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-warm-sand shadow-xs">
                  <span className="text-[11px] font-bold text-charcoal/60 uppercase block">Total Sales</span>
                  <span className="text-xl font-bold text-emerald-800 font-mono">₹{totalRevenue}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-warm-sand shadow-xs">
                  <span className="text-[11px] font-bold text-charcoal/60 uppercase block">Karaikudi Local</span>
                  <span className="text-xl font-bold text-sage-green font-mono">{totalKaraikudiOrders}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-warm-sand shadow-xs">
                  <span className="text-[11px] font-bold text-charcoal/60 uppercase block">Online Paid</span>
                  <span className="text-xl font-bold text-deep-forest font-mono">{totalPaidOnline}</span>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                    placeholder="Search by customer name, phone, order ID..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-warm-sand text-xs focus:outline-none focus:border-deep-forest"
                  />
                </div>

                {/* Export & Refresh Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={fetchAdminOrders}
                    disabled={isLoading}
                    className="p-2 rounded-xl border border-warm-sand bg-white hover:bg-gray-50 text-deep-forest"
                    title="Refresh orders from Supabase"
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  </button>

                  <button
                    onClick={() => downloadOrdersCSV(orders, `znaturals_orders_all_${new Date().toISOString().slice(0, 10)}.csv`)}
                    disabled={orders.length === 0}
                    className="py-2 px-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
                    title="Export all orders to a spreadsheet file that opens in Google Sheets or Excel"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export to Google Sheets (CSV)</span>
                  </button>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-2 text-xs border-b border-warm-sand pb-2">
                <button
                  onClick={() => setSelectedFilter('all')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    selectedFilter === 'all' ? 'bg-deep-forest text-white' : 'bg-white text-charcoal/70'
                  }`}
                >
                  All ({orders.length})
                </button>
                <button
                  onClick={() => setSelectedFilter('karaikudi')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    selectedFilter === 'karaikudi' ? 'bg-deep-forest text-white' : 'bg-white text-charcoal/70'
                  }`}
                >
                  Karaikudi Local ({totalKaraikudiOrders})
                </button>
                <button
                  onClick={() => setSelectedFilter('paid')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    selectedFilter === 'paid' ? 'bg-deep-forest text-white' : 'bg-white text-charcoal/70'
                  }`}
                >
                  Paid Online ({totalPaidOnline})
                </button>
                <button
                  onClick={() => setSelectedFilter('cod')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    selectedFilter === 'cod' ? 'bg-deep-forest text-white' : 'bg-white text-charcoal/70'
                  }`}
                >
                  COD Pending ({orders.length - totalPaidOnline})
                </button>
              </div>

              {/* Orders List */}
              {filteredOrders.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-2xl border border-warm-sand text-charcoal/60 space-y-1">
                  <ShoppingBag className="w-8 h-8 text-warm-sand mx-auto" />
                  <p className="text-sm font-semibold">No orders found.</p>
                  <p className="text-xs">When customers place orders, they will appear here in real time.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredOrders.map((ord) => (
                    <div 
                      key={ord.id} 
                      className="p-4 rounded-2xl bg-white border border-warm-sand shadow-xs space-y-2.5 text-xs hover:border-champagne-gold transition-all"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-warm-sand/50 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-deep-forest bg-deep-forest/5 px-2 py-0.5 rounded">
                            {ord.id}
                          </span>
                          <span className="text-charcoal/60 text-[11px]">
                            {new Date(ord.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                            ord.paymentStatus === 'Paid (Online)'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-900'
                          }`}>
                            {ord.paymentStatus}
                          </span>
                          <span className="font-mono font-bold text-deep-forest text-sm">
                            ₹{ord.total}
                          </span>
                        </div>
                      </div>

                      {/* Customer & Address Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-charcoal/80">
                        <div>
                          <p className="font-bold text-deep-forest text-sm">{ord.customerName}</p>
                          <p className="font-mono text-xs">+91 {ord.phone}</p>
                          <p className="text-[11px] mt-0.5">{ord.address}{ord.landmark ? `, Landmark: ${ord.landmark}` : ''}</p>
                          <p className="font-medium text-deep-forest">{ord.city}, {ord.state} - {ord.pincode}</p>
                        </div>
                        
                        <div className="space-y-1 sm:text-right">
                          <span className="inline-block px-2 py-0.5 rounded bg-sage-green/10 text-deep-forest font-semibold text-[11px]">
                            {ord.deliverySlot || ord.zone}
                          </span>
                          <p className="text-[11px] text-charcoal/60">Payment Mode: {ord.paymentMethod}</p>
                          {ord.upiUtr && (
                            <p className="font-mono text-[11px] text-emerald-800 font-bold">Ref: {ord.upiUtr}</p>
                          )}
                        </div>
                      </div>

                      {/* Ordered Items Summary */}
                      <div className="bg-botanical-ivory p-2.5 rounded-xl border border-warm-sand/60 text-[11px] space-y-1">
                        <span className="font-bold text-deep-forest uppercase tracking-wider text-[10px] block">
                          Ordered Items ({ord.items.length}):
                        </span>
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between text-charcoal/80">
                            <span>{it.quantity}x {it.productName} ({it.volume || ''})</span>
                            <span className="font-medium">₹{it.price * it.quantity}</span>
                          </div>
                        ))}
                      </div>

                      {/* Individual Order Actions */}
                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          onClick={() => downloadOrdersCSV([ord], `bill_${ord.id}.csv`)}
                          className="px-2.5 py-1 rounded-lg border border-warm-sand hover:bg-gray-50 text-deep-forest font-semibold text-[11px] flex items-center gap-1"
                        >
                          <Download className="w-3 h-3 text-champagne-gold" />
                          <span>Export Bill</span>
                        </button>
                        <button
                          onClick={() => printSingleOrderSlip(ord)}
                          className="px-2.5 py-1 rounded-lg border border-warm-sand hover:bg-gray-50 text-deep-forest font-semibold text-[11px] flex items-center gap-1"
                        >
                          <Printer className="w-3 h-3 text-sage-green" />
                          <span>Print Slip</span>
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="p-3 bg-botanical-ivory border-t border-warm-sand/60 text-center text-[10px] text-charcoal/60 flex items-center justify-between px-6 flex-shrink-0">
          <span>Z NATURALS Store Operations • Karaikudi Delivery Helpline: +91 9344087944</span>
          {isAuthenticated && (
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="text-red-700 hover:underline font-semibold"
            >
              Lock Dashboard
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
