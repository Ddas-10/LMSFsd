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
    primary: `
      bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)]
      text-white shadow-lg hover:shadow-xl
      transform hover:-translate-y-0.5 active:translate-y-0
      ring-2 ring-[var(--accent-primary)]/20 hover:ring-[var(--accent-primary)]/30
    `,
    secondary: `
      bg-[var(--bg-card)] border-2 border-[var(--border-color)]
      hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10
      text-[var(--text-primary)] hover:text-[var(--accent-primary)]
      shadow-sm hover:shadow-md
      transform hover:-translate-y-0.5 active:translate-y-0
    `,
    academic: `
      bg-[var(--accent-secondary)] hover:bg-[var(--accent-primary)]
      text-white shadow-lg hover:shadow-xl
      transform hover:-translate-y-0.5 active:translate-y-0
      ring-2 ring-[var(--accent-secondary)]/20 hover:ring-[var(--accent-secondary)]/30
    `,
    success: `
      bg-gradient-to-r from-emerald-600 to-green-600
      hover:from-emerald-700 hover:to-green-700
      text-white shadow-lg hover:shadow-emerald-500/50
      transform hover:-translate-y-0.5 active:translate-y-0
    `,
    danger: `
      bg-gradient-to-r from-red-600 to-rose-600
      hover:from-red-700 hover:to-rose-700
      text-white shadow-lg hover:shadow-red-500/50
      transform hover:-translate-y-0.5 active:translate-y-0
    `,
    ghost: `
      bg-transparent hover:bg-[var(--bg-card)]/50
      text-[var(--text-primary)] hover:text-[var(--text-secondary)]
    `,
    outline: `
      bg-transparent border-2 border-[var(--accent-primary)]
      text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-white
      shadow-sm hover:shadow-md
      transform hover:-translate-y-0.5 active:translate-y-0
    `,
    glass: `
      glass text-[var(--text-primary)] hover:bg-[var(--bg-card)]/90
      shadow-lg hover:shadow-xl
      transform hover:-translate-y-0.5 active:translate-y-0
    `
  };

  const sizes = {
    xs: 'px-3 py-1.5 text-xs',
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3 text-base',
    xl: 'px-10 py-4 text-lg'
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
        disabled:transform-none disabled:shadow-none
        flex items-center justify-center gap-2
        ${variants[variant]}
        ${className}
      `}
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
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
