import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  ShoppingBag, 
  RefreshCw, 
  CheckCircle2, 
  ArrowRight,
  Leaf
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

export const AIBeautyAdvisor: React.FC = () => {
  const { isAiAdvisorOpen, setIsAiAdvisorOpen, addToCart, setActiveProductModal } = useStore();

  const [step, setStep] = useState<'category' | 'concern' | 'type' | 'result'>('category');
  const [selectedDomain, setSelectedDomain] = useState<'Skin' | 'Hair' | 'Body' | null>(null);
  const [selectedConcern, setSelectedConcern] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [customQuery, setCustomQuery] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; products?: Product[] }>>([
    {
      sender: 'bot',
      text: 'Vanakkam! I am your Z NATURALS Botanical Beauty Advisor. Tell me about your skin or hair goals, and I will prescribe the ideal Chettinad cold-pressed botanical regimen.'
    }
  ]);

  if (!isAiAdvisorOpen) return null;

  const handleDomainSelect = (domain: 'Skin' | 'Hair' | 'Body') => {
    setSelectedDomain(domain);
    setStep('concern');
  };

  const handleConcernSelect = (concern: string) => {
    setSelectedConcern(concern);
    setStep('type');
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setIsAnalyzing(true);
    setStep('result');

    setTimeout(() => {
      // Find matching products based on domain & concern
      let matched = PRODUCTS.filter((p) => {
        if (selectedDomain === 'Skin' && (p.category === 'Face' || p.category === 'Milk')) return true;
        if (selectedDomain === 'Hair' && p.category === 'Hair') return true;
        if (selectedDomain === 'Body' && (p.category === 'Body' || p.category === 'Milk')) return true;
        return false;
      });

      // Filter further by concern if possible
      const concernMatched = matched.filter((p) =>
        p.concerns.some((c) => c.toLowerCase().includes(selectedConcern?.toLowerCase() || ''))
      );

      if (concernMatched.length > 0) {
        matched = concernMatched;
      }

      setRecommendations(matched);
      setIsAnalyzing(false);

      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'user',
          text: `My concern is ${selectedConcern} for my ${selectedType} ${selectedDomain?.toLowerCase()}.`
        },
        {
          sender: 'bot',
          text: `Based on your ${selectedType} profile, I have formulated a targeted Chettinad botanical solution to heal ${selectedConcern}. Here are your prescribed products:`,
          products: matched
        }
      ]);
    }, 1200);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim()) return;

    const userText = customQuery;
    setCustomQuery('');

    // Quick keyword matching for conversational advice
    const q = userText.toLowerCase();
    let matchedProducts: Product[] = [];
    let botReply = '';

    if (q.includes('hair') || q.includes('fall') || q.includes('dandruff') || q.includes('oil') || q.includes('shampoo')) {
      matchedProducts = PRODUCTS.filter((p) => p.category === 'Hair' || p.id === 'zn-combo-04');
      botReply = 'For hair strengthening, our Z Naturals Advanced Herbs Hair Oil and Rosemary / Shikakai Herbal Shampoos nourish follicles from the roots and stop excessive hair shedding.';
    } else if (q.includes('glow') || q.includes('pigment') || q.includes('spot') || q.includes('tan') || q.includes('acne') || q.includes('pimple') || q.includes('serum')) {
      matchedProducts = PRODUCTS.filter((p) => p.id === 'zn-face-01' || p.id === 'zn-face-02' || p.id === 'zn-face-03' || p.id === 'zn-combo-02');
      botReply = 'For radiant, spot-free skin, our Kumkumadi Face Serum enriched with 26 royal herbs, paired with Anti-Acne Serum and Kumkumadi Face Wash, delivers deep nourishment and timeless glow.';
    } else if (q.includes('bath') || q.includes('soap') || q.includes('body') || q.includes('milk') || q.includes('dry')) {
      matchedProducts = PRODUCTS.filter((p) => p.category === 'Body' || p.category === 'Milk');
      botReply = 'For deep moisturizing and silky-smooth skin, our handcrafted Kuppaimeni Herbal Soap and Pure Goat Milk Active Face Cream restore natural lipid balance.';
    } else {
      matchedProducts = PRODUCTS.filter(p => p.isBestseller).slice(0, 3);
      botReply = 'Welcome to Z NATURALS! Here are our signature botanical bestsellers handcrafted with cold-pressed natural ingredients.';
    }

    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText },
      { sender: 'bot', text: botReply, products: matchedProducts }
    ]);
  };

  const handleReset = () => {
    setStep('category');
    setSelectedDomain(null);
    setSelectedConcern(null);
    setSelectedType(null);
    setRecommendations([]);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsAiAdvisorOpen(false)}
      />

      <div className="relative w-full max-w-lg bg-soft-white h-full shadow-2xl flex flex-col border-l border-warm-sand z-10">
        
        {/* Header */}
        <div className="p-4 bg-deep-forest text-botanical-ivory flex items-center justify-between border-b border-champagne-gold/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-champagne-gold/20 border border-champagne-gold flex items-center justify-center text-champagne-gold">
              <Sparkles className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-lg leading-none">
                  Z Naturals AI Advisor
                </h3>
                <span className="text-[10px] bg-champagne-gold/20 text-champagne-gold px-1.5 py-0.5 rounded border border-champagne-gold/30">
                  Botanical AI
                </span>
              </div>
              <p className="text-[11px] text-botanical-ivory/70 mt-0.5">
                Chettinad Herbal Diagnostics & Prescription
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAiAdvisorOpen(false)}
            className="p-1.5 rounded-full text-botanical-ivory/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Advisor Main Conversation Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-botanical-ivory/40">
          
          {/* Diagnostic Wizard Cards */}
          <div className="p-4 rounded-2xl bg-white border border-warm-sand shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-deep-forest uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-sage-green" />
                Botanical Consultation Guide
              </span>
              {step !== 'category' && (
                <button
                  onClick={handleReset}
                  className="text-sage-green hover:underline flex items-center gap-1 text-[11px]"
                >
                  <RefreshCw className="w-3 h-3" /> Start Over
                </button>
              )}
            </div>

            {/* Step 1: Category */}
            {step === 'category' && (
              <div className="space-y-2">
                <p className="text-xs text-charcoal/75">
                  Which botanical care domain would you like guidance on today?
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleDomainSelect('Skin')}
                    className="p-3 rounded-xl border border-warm-sand bg-botanical-ivory/60 hover:bg-deep-forest hover:text-white text-xs font-semibold transition-all text-center"
                  >
                    🌸 Skincare
                  </button>
                  <button
                    onClick={() => handleDomainSelect('Hair')}
                    className="p-3 rounded-xl border border-warm-sand bg-botanical-ivory/60 hover:bg-deep-forest hover:text-white text-xs font-semibold transition-all text-center"
                  >
                    🌿 Haircare
                  </button>
                  <button
                    onClick={() => handleDomainSelect('Body')}
                    className="p-3 rounded-xl border border-warm-sand bg-botanical-ivory/60 hover:bg-deep-forest hover:text-white text-xs font-semibold transition-all text-center"
                  >
                    ✨ Body Care
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Concern */}
            {step === 'concern' && (
              <div className="space-y-2">
                <p className="text-xs text-charcoal/75">
                  What is your primary {selectedDomain} concern?
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {selectedDomain === 'Skin' && (
                    <>
                      <button onClick={() => handleConcernSelect('Acne & Blemishes')} className="p-2.5 rounded-lg border border-warm-sand bg-botanical-ivory text-left font-medium hover:bg-deep-forest hover:text-white">
                        Acne & Active Pimples
                      </button>
                      <button onClick={() => handleConcernSelect('Pigmentation')} className="p-2.5 rounded-lg border border-warm-sand bg-botanical-ivory text-left font-medium hover:bg-deep-forest hover:text-white">
                        Pigmentation & Dark Spots
                      </button>
                      <button onClick={() => handleConcernSelect('Daily Glow')} className="p-2.5 rounded-lg border border-warm-sand bg-botanical-ivory text-left font-medium hover:bg-deep-forest hover:text-white">
                        Dull Skin / Daily Radiance
                      </button>
                      <button onClick={() => handleConcernSelect('Dry Skin')} className="p-2.5 rounded-lg border border-warm-sand bg-botanical-ivory text-left font-medium hover:bg-deep-forest hover:text-white">
                        Dryness & Peeling
                      </button>
                    </>
                  )}
                  {selectedDomain === 'Hair' && (
                    <>
                      <button onClick={() => handleConcernSelect('Hair Fall')} className="p-2.5 rounded-lg border border-warm-sand bg-botanical-ivory text-left font-medium hover:bg-deep-forest hover:text-white">
                        Excessive Hair Shedding
                      </button>
                      <button onClick={() => handleConcernSelect('Dandruff')} className="p-2.5 rounded-lg border border-warm-sand bg-botanical-ivory text-left font-medium hover:bg-deep-forest hover:text-white">
                        Itchy Scalp & Flakes
                      </button>
                    </>
                  )}
                  {selectedDomain === 'Body' && (
                    <>
                      <button onClick={() => handleConcernSelect('Daily Glow')} className="p-2.5 rounded-lg border border-warm-sand bg-botanical-ivory text-left font-medium hover:bg-deep-forest hover:text-white">
                        Body Polish & Tan Removal
                      </button>
                      <button onClick={() => handleConcernSelect('Dry Skin')} className="p-2.5 rounded-lg border border-warm-sand bg-botanical-ivory text-left font-medium hover:bg-deep-forest hover:text-white">
                        Rough Ashen Skin & Elbows
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Skin/Hair Type */}
            {step === 'type' && (
              <div className="space-y-2">
                <p className="text-xs text-charcoal/75">
                  Select your {selectedDomain} profile:
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button onClick={() => handleTypeSelect('Sensitive / Delicate')} className="p-2.5 rounded-lg border border-warm-sand bg-botanical-ivory text-left font-medium hover:bg-deep-forest hover:text-white">
                    Sensitive / Easily Reactive
                  </button>
                  <button onClick={() => handleTypeSelect('Dry / Dehydrated')} className="p-2.5 rounded-lg border border-warm-sand bg-botanical-ivory text-left font-medium hover:bg-deep-forest hover:text-white">
                    Dry / Lacks Moisture
                  </button>
                  <button onClick={() => handleTypeSelect('Oily / Combination')} className="p-2.5 rounded-lg border border-warm-sand bg-botanical-ivory text-left font-medium hover:bg-deep-forest hover:text-white">
                    Oily / T-Zone Shine
                  </button>
                  <button onClick={() => handleTypeSelect('Normal / Balanced')} className="p-2.5 rounded-lg border border-warm-sand bg-botanical-ivory text-left font-medium hover:bg-deep-forest hover:text-white">
                    Normal / Well-Balanced
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Analyzing State */}
            {isAnalyzing && (
              <div className="py-6 text-center space-y-2">
                <div className="w-8 h-8 rounded-full border-2 border-deep-forest border-t-transparent animate-spin mx-auto" />
                <p className="text-xs font-serif text-deep-forest font-semibold italic">
                  Analyzing Chettinad botanical pharmacopeia for your profile...
                </p>
              </div>
            )}
          </div>

          {/* Chat Messages Log */}
          {chatMessages.map((msg, idx) => (
            <div key={idx} className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'bot' && (
                <div className="w-7 h-7 rounded-full bg-deep-forest text-champagne-gold flex items-center justify-center flex-shrink-0 text-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed space-y-2 ${
                msg.sender === 'user' 
                  ? 'bg-deep-forest text-botanical-ivory' 
                  : 'bg-white text-charcoal border border-warm-sand shadow-sm'
              }`}>
                <p>{msg.text}</p>

                {/* Attached Products in Message */}
                {msg.products && msg.products.length > 0 && (
                  <div className="pt-2 space-y-2">
                    {msg.products.map((prod) => (
                      <div 
                        key={prod.id} 
                        className="p-2.5 rounded-xl bg-botanical-ivory/60 border border-warm-sand flex gap-2.5 items-center text-left"
                      >
                        <img 
                          src={prod.image} 
                          alt={prod.name} 
                          className="w-12 h-12 rounded-lg object-cover border border-warm-sand" 
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-serif font-bold text-xs text-deep-forest truncate">
                            {prod.name}
                          </h5>
                          <div className="text-[10px] text-charcoal/60 truncate">
                            {prod.tagline}
                          </div>
                          <div className="text-xs font-bold text-deep-forest">
                            ₹{prod.price}
                          </div>
                        </div>
                        <button
                          onClick={() => addToCart(prod, 1)}
                          className="px-2.5 py-1.5 rounded-lg bg-deep-forest text-botanical-ivory text-[10px] font-bold uppercase tracking-wider hover:bg-deep-forest-dark flex items-center gap-1"
                        >
                          <ShoppingBag className="w-3 h-3 text-champagne-gold" />
                          Add
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-full bg-sage-green text-white flex items-center justify-center flex-shrink-0 text-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

        </div>

        {/* Custom Question Input */}
        <form onSubmit={handleCustomSubmit} className="p-3 bg-white border-t border-warm-sand flex gap-2">
          <input
            type="text"
            value={customQuery}
            onChange={(e) => setCustomQuery(e.target.value)}
            placeholder="Ask about acne, hair oiling, Chettinad herbs..."
            className="flex-1 px-3 py-2 rounded-xl bg-botanical-ivory/50 border border-warm-sand text-xs focus:outline-none focus:ring-1 focus:ring-deep-forest"
          />
          <button
            type="submit"
            className="p-2 rounded-xl bg-deep-forest text-botanical-ivory hover:bg-deep-forest-dark transition-colors"
            aria-label="Send message"
          >
            <Send className="w-4 h-4 text-champagne-gold" />
          </button>
        </form>

      </div>
    </div>
  );
};
