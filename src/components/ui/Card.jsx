import React from 'react';

export const Card = ({
  children,
  className = '',
  hover = false,
  gradient = false,
  glass = false,
  padding = 'md',
  onClick,
  variant = 'default',
  bordered = false
}) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  const variants = {
    default: 'bg-[var(--bg-card)] shadow-md border border-[var(--border-color)]',
    elevated: 'bg-[var(--bg-card)] shadow-xl border border-[var(--border-color)]',
    flat: 'bg-[var(--bg-card)] border-2 border-[var(--border-color)]',
    academic: 'bg-gradient-to-br from-[var(--bg-card)] via-[var(--section-bg)] to-[var(--bg-card)] shadow-lg border border-[var(--border-color)]',
    glass: 'glass',
    glassDark: 'glass-dark text-[var(--text-primary)]',
    outline: 'bg-transparent border-2 border-[var(--border-color)] hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10',
  };

  const baseStyles = glass
    ? 'glass'
    : variants[variant];

  const hoverStyles = hover ? 'card-hover cursor-pointer transform-gpu' : '';
  const gradientStyles = gradient ? 'bg-gradient-to-br from-[var(--bg-card)] to-[var(--section-bg)]' : '';
  const borderedStyles = bordered ? 'border-l-4 border-[var(--accent-primary)]' : '';

  return (
    <div
      className={`
        rounded-2xl
        ${baseStyles}
        ${hoverStyles}
        ${gradientStyles}
        ${borderedStyles}
        ${paddings[padding]}
        ${className}
        transition-all duration-300
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick(e) : undefined}
    >
      {children}
    </div>
  );
};
