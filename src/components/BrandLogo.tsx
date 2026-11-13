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
    sm: 'text-xl tracking-wider',
    md: 'text-2xl md:text-3xl tracking-widest',
    lg: 'text-3xl md:text-4xl tracking-widest',
    xl: 'text-4xl md:text-5xl tracking-widest',
  }[size];

  const subTextClasses = {
    sm: 'text-[7px] tracking-[0.2em]',
    md: 'text-[9px] md:text-[10px] tracking-[0.25em]',
    lg: 'text-[11px] md:text-[12px] tracking-[0.3em]',
    xl: 'text-[13px] md:text-[14px] tracking-[0.35em]',
  }[size];

  // Stylized "Z" with botanical leaf SVG
  const MonogramSvg = (
    <svg 
      width={iconDimensions.width} 
      height={iconDimensions.height} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0 transition-transform duration-300 hover:scale-105"
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
        d="M 22 26 L 76 26 C 77.5 26 78 27 77.5 28.5 L 75 34 C 74.5 35 73.5 35.5 72 35.5 L 43 35.5 L 68 62 C 69.5 63.5 70 65 69.5 67 L 67 72 C 66.5 73.5 65.5 74 64 74 L 20 74 C 18.5 74 18 73 18.5 71.5 L 21 66 C 21.5 65 22.5 64.5 24 64.5 L 54 64.5 L 29 38 C 27.5 36.5 27 35 27.5 33 L 30 28 C 30.5 26.5 31.5 26 22 26 Z" 
        fill={forestColor}
      />

      {/* Organic Botanical Leaf Accent curving gracefully across the diagonal */}
      <path 
        d="M 36 53 C 44 41 63 38 78 44 C 72 57 55 67 36 53 Z" 
        fill={`url(#goldGrad-${size}-${theme})`}
        stroke="#FFFFFF"
        strokeWidth="0.5"
      />
      {/* Delicate Leaf Spine & Vein */}
      <path 
        d="M 38 53 Q 56 49 76 45" 
        stroke={forestColor} 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        opacity="0.8"
      />
      <path 
        d="M 48 51 Q 52 46 56 44" 
        stroke={forestColor} 
        strokeWidth="0.8" 
        strokeLinecap="round" 
        opacity="0.6"
      />
      <path 
        d="M 58 49 Q 63 45 68 44" 
        stroke={forestColor} 
        strokeWidth="0.8" 
        strokeLinecap="round" 
        opacity="0.6"
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
      className={`inline-flex items-center gap-3 cursor-pointer select-none group ${className}`}
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
          <span className="text-[10px] -mt-1 font-serif font-normal" style={{ color: goldColor }}>®</span>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <span className="h-[1px] w-3 bg-champagne-gold/40" />
          <span 
            className={`font-sans font-medium uppercase ${subTextClasses}`}
            style={{ color: subtitleColor }}
          >
            {BRAND_CONFIG.subtitle}
          </span>
          <span className="h-[1px] w-3 bg-champagne-gold/40 hidden sm:inline-block" />
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
