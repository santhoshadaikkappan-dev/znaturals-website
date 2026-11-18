import React from 'react';
import { LOGO_ASSET_PATH, BRAND_CONFIG } from '../config/storeConfig';

interface BrandLogoProps {
  variant?: 'horizontal' | 'vertical' | 'monogram' | 'seal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'dark-on-light' | 'light-on-dark' | 'gold';
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  theme = 'dark-on-light',
  showTagline = false,
  className = '',
  onClick,
}) => {
  // If user provides a final asset file path in config, render that image
  if (LOGO_ASSET_PATH) {
    return (
      <div 
        className={`inline-flex items-center cursor-pointer select-none ${className}`}
        onClick={onClick}
      >
        <img 
          src={LOGO_ASSET_PATH} 
          alt={BRAND_CONFIG.name} 
          className="h-10 w-auto object-contain" 
        />
      </div>
    );
  }

  // Theme-based colors
  const forestColor = theme === 'light-on-dark' ? '#FFFCF7' : '#263D32';
  const goldColor = '#C5A16B';
  const subtitleColor = theme === 'light-on-dark' ? '#D9CBB5' : '#66765C';

  // Dimension scaling
  const iconDimensions = {
    sm: { width: 34, height: 34 },
    md: { width: 44, height: 44 },
    lg: { width: 58, height: 58 },
    xl: { width: 78, height: 78 },
  }[size];

  const brandTextClasses = {
    sm: 'text-lg sm:text-xl tracking-wider',
    md: 'text-lg sm:text-2xl md:text-3xl tracking-wider sm:tracking-widest',
    lg: 'text-2xl sm:text-3xl md:text-4xl tracking-wider sm:tracking-widest',
    xl: 'text-3xl sm:text-4xl md:text-5xl tracking-widest',
  }[size];

  const subTextClasses = {
    sm: 'text-[7px] tracking-[0.15em]',
    md: 'text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.18em] sm:tracking-[0.25em]',
    lg: 'text-[10px] sm:text-[11px] md:text-[12px] tracking-[0.2em] sm:tracking-[0.3em]',
    xl: 'text-[12px] sm:text-[13px] md:text-[14px] tracking-[0.25em] sm:tracking-[0.35em]',
  }[size];

  // Stylized "Z" with botanical leaf SVG
  const MonogramSvg = (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 flex-shrink-0 transition-transform duration-300 hover:scale-105"
    >
      <defs>
        <linearGradient id={`goldGrad-${size}-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C5A16B" />
          <stop offset="50%" stopColor="#E6D3B1" />
          <stop offset="100%" stopColor="#A88349" />
        </linearGradient>
      </defs>

      {/* Main Serif Z Body */}
      <path 
        d="M 18 24 L 82 24 C 84 24 85 26 84 29 L 81 35 C 80 37 78 38 74 38 L 46 38 L 74 72 C 76 74 76 76 75 78 L 73 83 C 72 85 70 86 66 86 L 16 86 C 14 86 13 84 14 81 L 17 75 C 18 73 20 72 24 72 L 53 72 L 25 38 C 23 36 23 34 24 32 L 26 27 C 27 25 29 24 18 24 Z" 
        fill={forestColor}
      />

      {/* Two-Toned Botanical Leaf crossing through the diagonal */}
      {/* Upper Golden Leaf Curve */}
      <path 
        d="M 15 58 C 35 38 65 34 88 44 C 68 52 42 58 15 58 Z" 
        fill={`url(#goldGrad-${size}-${theme})`}
      />
      {/* Lower Forest Green Leaf Curve */}
      <path 
        d="M 17 57 C 40 43 70 38 88 44 C 68 66 38 72 17 57 Z" 
        fill={theme === 'light-on-dark' ? '#4A705B' : '#182E22'}
      />
      {/* Delicate Center Leaf Vein Line */}
      <path 
        d="M 17 57 C 48 50 68 47 88 44" 
        stroke="#FFFFFF" 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        opacity="0.9"
      />
    </svg>
  );

  // Luxury Round Brand Seal variant
  if (variant === 'seal') {
    return (
      <div 
        className={`relative inline-flex flex-col items-center justify-center p-4 rounded-full border-2 border-champagne-gold/60 bg-botanical-ivory shadow-lg select-none cursor-pointer group ${className}`}
        onClick={onClick}
      >
        <div className="absolute inset-1 rounded-full border border-champagne-gold/30 pointer-events-none" />
        <div className="w-12 h-12 mb-1">
          {MonogramSvg}
        </div>
        <span className="font-serif font-bold text-sm tracking-widest text-deep-forest">Z NATURALS</span>
        <span className="text-[7px] tracking-[0.2em] text-champagne-gold font-semibold uppercase mt-0.5">Botanical Beauty</span>
      </div>
    );
  }

  // Monogram Only
  if (variant === 'monogram') {
    return (
      <div 
        className={`inline-flex items-center justify-center cursor-pointer select-none ${className}`}
        onClick={onClick}
        title="Z NATURALS"
      >
        {MonogramSvg}
      </div>
    );
  }

  // Vertical Stacked Logo
  if (variant === 'vertical') {
    return (
      <div 
        className={`inline-flex flex-col items-center text-center cursor-pointer select-none group ${className}`}
        onClick={onClick}
      >
        <div className="mb-2">
          {MonogramSvg}
        </div>
        <div className="flex items-center justify-center gap-1">
          <span 
            className={`font-serif font-semibold uppercase ${brandTextClasses}`}
            style={{ color: forestColor }}
          >
            {BRAND_CONFIG.name}
          </span>
          <span className="text-xs -mt-3 font-serif" style={{ color: goldColor }}>®</span>
        </div>
        
        {/* Hairline Divider & Subtitle */}
        <div className="flex items-center justify-center gap-2 w-full mt-1">
          <span className="h-[1px] w-6 bg-champagne-gold/50" />
          <span 
            className={`font-sans font-medium uppercase ${subTextClasses}`}
            style={{ color: subtitleColor }}
          >
            {BRAND_CONFIG.subtitle}
          </span>
          <span className="h-[1px] w-6 bg-champagne-gold/50" />
        </div>

        {showTagline && (
          <p className="font-editorial text-sm text-sage-green mt-2 italic tracking-wide">
            "{BRAND_CONFIG.tagline}"
          </p>
        )}
      </div>
    );
  }

  // Default: Horizontal Luxury Logo
  return (
    <div 
      className={`inline-flex items-center gap-2 sm:gap-3 cursor-pointer select-none group ${className}`}
      onClick={onClick}
    >
      {MonogramSvg}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1 leading-none">
          <span 
            className={`font-serif font-bold uppercase transition-colors ${brandTextClasses}`}
            style={{ color: forestColor }}
          >
            {BRAND_CONFIG.name}
          </span>
          <span className="text-[9px] sm:text-[10px] -mt-1 font-serif font-normal" style={{ color: goldColor }}>®</span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1">
          <span className="h-[1px] w-2 sm:w-3 bg-champagne-gold/40" />
          <span 
            className={`font-sans font-medium uppercase ${subTextClasses}`}
            style={{ color: subtitleColor }}
          >
            <span className="sm:hidden">Botanical Care</span>
            <span className="hidden sm:inline">{BRAND_CONFIG.subtitle}</span>
          </span>
          <span className="h-[1px] w-2 sm:w-3 bg-champagne-gold/40 hidden sm:inline-block" />
        </div>

        {showTagline && (
          <p className="font-editorial text-xs text-sage-green mt-1 italic hidden sm:block">
            {BRAND_CONFIG.tagline}
          </p>
        )}
      </div>
    </div>
  );
};
