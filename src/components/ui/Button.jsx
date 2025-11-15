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
    primary: 'bg-gradient-to-r from-blue-400 to-indigo-400 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md hover:shadow-xl',
    secondary: 'bg-white/80 backdrop-blur-sm border border-neutral-200 hover:border-neutral-300 text-neutral-600 hover:bg-white/90',
    danger: 'bg-gradient-to-r from-red-400 to-rose-400 hover:from-red-500 hover:to-rose-500 text-white shadow-md',
    success: 'bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500 text-white shadow-md',
    ghost: 'hover:bg-neutral-50/80 text-neutral-600',
    outline: 'border border-blue-400 text-blue-500 hover:bg-blue-50/50 backdrop-blur-sm'
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