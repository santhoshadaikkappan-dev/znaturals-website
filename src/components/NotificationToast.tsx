import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-slideUp">
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-deep-forest text-botanical-ivory shadow-xl border border-champagne-gold/60 text-xs font-medium">
        <CheckCircle2 className="w-4 h-4 text-champagne-gold flex-shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
