import React from 'react';

export const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '' 
}) => {
  const variants = {
    default: 'bg-neutral-50/80 text-neutral-600 border-neutral-100',
    success: 'bg-green-50/80 text-green-600 border-green-100',
    warning: 'bg-amber-50/80 text-amber-600 border-amber-100',
    danger: 'bg-rose-50/80 text-rose-600 border-rose-100',
    info: 'bg-blue-50/80 text-blue-600 border-blue-100',
    purple: 'bg-purple-50/80 text-purple-600 border-purple-100',
    primary: 'bg-gradient-to-r from-blue-400 to-indigo-400 text-white border-transparent shadow-sm'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm'
  };

  return (
    <span className={`
      inline-flex items-center 
      rounded-full 
      border 
      font-semibold 
      backdrop-blur-sm
      ${variants[variant]} 
      ${sizes[size]} 
      ${className}
    `}>
      {children}
    </span>
  );
};