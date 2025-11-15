import React from 'react';

export const Card = ({ 
  children, 
  className = '', 
  hover = false,
  gradient = false,
  glass = false,
  padding = 'md',
  onClick  //  Add onClick prop
}) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const baseStyles = glass 
    ? 'glass shadow-lg' 
    : 'bg-white/90 backdrop-blur-sm shadow-sm border border-neutral-100';
  
  const hoverStyles = hover ? 'card-hover cursor-pointer' : '';
  const gradientStyles = gradient ? 'bg-gradient-to-br from-white/95 to-neutral-50/80' : '';

  return (
    <div 
      className={`rounded-2xl ${baseStyles} ${hoverStyles} ${gradientStyles} ${paddings[padding]} ${className}`}
      onClick={onClick}  // ✅ Add onClick handler
      role={onClick ? 'button' : undefined}  // ✅ Accessibility
      tabIndex={onClick ? 0 : undefined}  // ✅ Keyboard navigation
    >
      {children}
    </div>
  );
};