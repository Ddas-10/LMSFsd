import React from 'react';

export const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '' 
}) => {
  const variants = {
    default: 'bg-neutral-100 text-neutral-700 border-neutral-200',
    success: 'bg-green-50 text-green-700 border-green-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-red-50 text-red-700 border-red-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent'
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
      ${variants[variant]} 
      ${sizes[size]} 
      ${className}
    `}>
      {children}
    </span>
  );
};