import React from 'react';

export const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled, 
  className = '', 
  icon: Icon, 
  type = 'button',
  size = 'md',
  fullWidth = false,
  loading = false
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg',
    secondary: 'bg-white border-2 border-neutral-300 hover:border-neutral-400 text-neutral-700 hover:bg-neutral-50',
    danger: 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-md',
    success: 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md',
    ghost: 'hover:bg-neutral-100 text-neutral-700',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${sizes[size]} 
        ${fullWidth ? 'w-full' : ''}
        rounded-xl font-semibold 
        transition-all duration-200 
        disabled:opacity-50 disabled:cursor-not-allowed 
        flex items-center justify-center gap-2 
        ${variants[variant]} 
        ${className}
      `}
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {Icon && <Icon size={18} />}
          {children}
        </>
      )}
    </button>
  );
};