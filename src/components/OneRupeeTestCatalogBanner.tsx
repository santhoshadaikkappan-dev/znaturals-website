import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  CheckCircle, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Smartphone, 
  CreditCard, 
  X,
  ExternalLink,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { launchRazorpayCheckout } from '../config/razorpay';
import { syncOrderToGoogleSheet } from '../utils/googleSheetsSync';
import { useStore } from '../context/StoreContext';
import { Order } from '../types';

export const OneRupeeTestCatalogBanner: React.FC = () => {
  const { customerProfile } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [name, setName] = useState(customerProfile.name || '');
  const [phone, setPhone] = useState(customerProfile.phone || '');
  const [paymentSuccess, setPaymentSuccess] = useState<{
    paymentId: string;
    orderId: string;
  } | null>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setPaymentSuccess(null);
  };

  const handlePayOneRupee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || phone.trim().length < 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    setIsPaying(true);

    const testOrderId = `ZN-CAT-₹1-${Math.floor(1000 + Math.random() * 9000)}`;

    const launched = await launchRazorpayCheckout({
      amount: 1, // Exactly ₹1.00 (100 paise)
      customer: {
        name: name.trim() || 'Z Naturals Patron',
        contact: phone.trim(),
        email: `${phone.trim()}@znaturals.in`,
        address: 'Karaikudi Central Operations (Catalog Verification)'
      },
      description: 'Z NATURALS — Official Botanical Product Catalog & Herbal Care Guide (PDF)',
      onSuccess: async (paymentId: string) => {
        setIsPaying(false);
        setPaymentSuccess({
          paymentId,
          orderId: testOrderId
        });

        // Trigger celebratory confetti
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {
          // Ignore
        }

        // Build digital order record
        const catalogOrder: Order = {
          id: testOrderId,
          customerName: name.trim() || 'Z Naturals Patron',
          phone: phone.trim(),
          address: 'Digital PDF Download (Live Gateway Verification)',
          landmark: 'Razorpay Live Test Payment',
          city: 'Karaikudi',
          state: 'Tamil Nadu',
          pincode: '630001',
          zone: 'Zone A (Karaikudi Local)',
          deliverySlot: 'Instant Digital PDF Download',
          items: [{
            productId: 'zn-catalog-pdf',
            productName: 'Official Botanical Product Catalog & Herbal Guide (PDF)',
            quantity: 1,
            price: 1,
            volume: 'Digital Edition (PDF)',
            weightGrams: 0
          }],
          subtotal: 1,
          shippingFee: 0,
          total: 1,
          totalWeightGrams: 0,
          status: 'Delivered',
          paymentMethod: 'Razorpay Online (UPI / GPay / PhonePe / Cards)',
          paymentStatus: 'Paid (Online)',
          upiUtr: paymentId,
          createdAt: new Date().toISOString()
        };

        // 1. Sync to Google Sheet Webhook
        await syncOrderToGoogleSheet(catalogOrder);

        // 2. Save in local shared orders
        try {
          const prev = JSON.parse(localStorage.getItem('zn_shared_orders') || '[]');
          localStorage.setItem('zn_shared_orders', JSON.stringify([catalogOrder, ...prev]));
        } catch {
          // Ignore
        }

        // 3. Automatically trigger PDF download
        triggerPdfDownload();
      },
      onDismiss: () => {
        setIsPaying(false);
      },
      onError: (errMsg: string) => {
        setIsPaying(false);
        alert(errMsg || "Payment could not be processed. Please try again.");
      }
    });

    if (!launched) {
      setIsPaying(false);
    }
  };

  const triggerPdfDownload = () => {
    const link = document.createElement('a');
    link.href = './docs/Z_NATURALS_Botanical_Product_Catalog_2026.pdf';
    link.download = 'Z_NATURALS_Botanical_Product_Catalog_2026.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Bottom Section Card */}
      <section className="py-12 bg-botanical-ivory border-t border-warm-sand/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="relative rounded-3xl bg-gradient-to-br from-deep-forest via-[#1F3329] to-deep-forest text-botanical-ivory p-6 sm:p-10 shadow-2xl border-2 border-champagne-gold/60 overflow-hidden">
            
            {/* Background Decorative Rings */}
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-champagne-gold/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-sage-green/10 blur-2xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Offer Details */}
              <div className="lg:col-span-8 space-y-4 text-left">
                
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-champagne-gold/20 border border-champagne-gold/50 text-champagne-gold text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Live Payment Test & Official Catalog</span>
                </div>

                <div className="space-y-1">
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-botanical-ivory leading-tight">
                    Verify Live Payment & Download Full Product Catalog
                  </h2>
                  <p className="text-xs sm:text-sm text-botanical-ivory/80 leading-relaxed max-w-2xl pt-1">
                    Check our automated <strong>Razorpay UPI & Card gateway</strong> with a live <strong>₹1 test transaction</strong>. 
                    Immediately unlock & download the official <strong>2026 Z NATURALS Botanical Formulary & Herbal Guide (PDF)</strong> with complete formulations, MRP, and Chettinad wellness tips.
                  </p>
                </div>

                {/* Micro Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-2.5 rounded-xl">
                    <Smartphone className="w-4 h-4 text-champagne-gold flex-shrink-0" />
                    <span>Instant UPI (GPay / PhonePe / Paytm)</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-2.5 rounded-xl">
                    <FileText className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>24 Botanical Products (Full Details)</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-2.5 rounded-xl">
                    <ShieldCheck className="w-4 h-4 text-champagne-gold flex-shrink-0" />
                    <span>Real-Time Razorpay Settlement Sync</span>
                  </div>
                </div>

              </div>

              {/* Right Column: ₹1 Action Box */}
              <div className="lg:col-span-4 flex flex-col items-stretch sm:items-center lg:items-end justify-center gap-3">
                
                <div className="w-full max-w-sm bg-soft-white text-charcoal rounded-2xl p-5 border border-warm-sand shadow-lg text-center space-y-3">
                  <div className="flex items-center justify-between border-b border-warm-sand/60 pb-3">
                    <span className="text-xs font-bold text-deep-forest uppercase tracking-wider">
                      Official PDF Guide
                    </span>
                    <span className="text-xs line-through text-charcoal/50">
                      ₹99
                    </span>
                  </div>

                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-extrabold text-deep-forest font-serif">₹1</span>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Live Test Price
                    </span>
                  </div>

                  <p className="text-[11px] text-charcoal/70 leading-normal">
                    Amount directly credits to your linked Razorpay Account in real time.
                  </p>

                  <button
                    onClick={handleOpenModal}
                    className="w-full py-3.5 px-4 rounded-xl bg-deep-forest hover:bg-deep-forest-dark text-botanical-ivory font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md group"
                  >
                    <span>Pay ₹1 & Download PDF</span>
                    <ArrowRight className="w-4 h-4 text-champagne-gold group-hover:translate-x-1 transition-transform" />
                  </button>

                  <a
                    href="./docs/catalog_preview.html"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-sage-green hover:underline font-semibold pt-1"
                  >
                    <span>Or preview catalog in browser free</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Checkout & Verification Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="fixed inset-0" onClick={() => !isPaying && setIsModalOpen(false)} />

          <div className="relative bg-soft-white rounded-3xl max-w-md w-full shadow-2xl border border-warm-sand overflow-hidden z-10 p-6 sm:p-8 space-y-5 text-charcoal">
            
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              disabled={isPaying}
              className="absolute top-4 right-4 p-2 rounded-full text-charcoal/50 hover:text-charcoal hover:bg-warm-sand/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!paymentSuccess ? (
              <>
                <div className="text-center space-y-1.5 pt-2">
                  <div className="w-12 h-12 rounded-2xl bg-deep-forest/5 text-deep-forest border border-champagne-gold/60 flex items-center justify-center mx-auto mb-2">
                    <CreditCard className="w-6 h-6 text-deep-forest" />
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-deep-forest">
                    Live Razorpay Verification
                  </h3>
                  <p className="text-xs text-charcoal/70 leading-relaxed">
                    Test live UPI (GPay / PhonePe / Paytm) with <strong>₹1.00</strong> to verify payments reach your Razorpay account.
                  </p>
                </div>

                <div className="bg-botanical-ivory p-3.5 rounded-xl border border-warm-sand text-xs flex justify-between items-center">
                  <div>
                    <span className="font-bold text-deep-forest block">Z NATURALS Product Formulary (PDF)</span>
                    <span className="text-[11px] text-charcoal/60">24 Formulations • Chettinad Botanicals</span>
                  </div>
                  <span className="text-lg font-extrabold text-deep-forest font-mono">₹1</span>
                </div>

                <form onSubmit={handlePayOneRupee} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-deep-forest mb-1 uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Santhosh A."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-botanical-ivory border border-warm-sand text-xs font-medium focus:outline-none focus:ring-2 focus:ring-deep-forest"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-deep-forest mb-1 uppercase tracking-wider">
                      WhatsApp / Phone Number
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-charcoal/50">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="9344087944"
                        className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-botanical-ivory border border-warm-sand text-xs font-mono font-medium focus:outline-none focus:ring-2 focus:ring-deep-forest"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isPaying}
                    className="w-full py-3.5 rounded-xl bg-deep-forest text-botanical-ivory font-bold text-xs uppercase tracking-wider hover:bg-deep-forest-dark transition-all flex items-center justify-center gap-2 shadow-botanical"
                  >
                    <Lock className="w-3.5 h-3.5 text-champagne-gold" />
                    <span>{isPaying ? 'Launching Razorpay Gateway...' : 'Proceed to Pay ₹1 via UPI / Card'}</span>
                  </button>

                  <p className="text-[10px] text-charcoal/50 text-center flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Direct 256-bit Encrypted Checkout via Razorpay India</span>
                  </p>
                </form>
              </>
            ) : (
              /* Success State */
              <div className="text-center space-y-4 py-2">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Live Payment Verified
                  </span>
                  <h3 className="font-serif font-bold text-2xl text-deep-forest">
                    ₹1.00 Received Successfully!
                  </h3>
                  <p className="text-xs text-charcoal/70">
                    Your test transaction was successfully processed by Razorpay.
                  </p>
                </div>

                <div className="p-3.5 bg-botanical-ivory rounded-xl border border-warm-sand text-left text-xs space-y-1.5 font-sans">
                  <div className="flex justify-between">
                    <span className="text-charcoal/60">Razorpay Payment ID:</span>
                    <strong className="font-mono text-deep-forest">{paymentSuccess.paymentId}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal/60">Order Reference:</span>
                    <strong className="font-mono text-deep-forest">{paymentSuccess.orderId}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal/60">Amount Paid:</span>
                    <strong className="text-emerald-800">₹1.00 (Captured)</strong>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-left text-xs text-amber-900 leading-relaxed">
                  <strong>💡 How to verify in Razorpay Dashboard:</strong><br/>
                  Open your Razorpay Dashboard &gt; Go to <strong>Transactions / Payments</strong> tab. 
                  You will see <strong>₹1.00</strong> with Payment ID <code className="font-mono bg-white px-1 py-0.5 rounded">{paymentSuccess.paymentId}</code> marked as <strong>Captured</strong> right now!
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={triggerPdfDownload}
                    className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF Catalog Again</span>
                  </button>

                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-full py-2.5 text-xs text-charcoal/70 hover:text-deep-forest font-semibold"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
};
