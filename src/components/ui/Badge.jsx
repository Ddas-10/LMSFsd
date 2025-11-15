import React from 'react';
import { Award, Star, TrendingUp, Target, Zap } from 'lucide-react';

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  icon,
  dot = false,
  pulse = false
}) => {
  const variants = {
    default: 'bg-[var(--section-bg)] text-[var(--text-secondary)] border-[var(--border-color)]',

    // Academic performance badges
    excellent: `
      bg-gradient-to-r from-emerald-50 to-green-50
      text-emerald-700 border-emerald-200
      ring-2 ring-emerald-100
      dark:from-emerald-900/30 dark:to-green-900/30 dark:text-emerald-300 dark:border-emerald-700 dark:ring-emerald-800/50
    `,
    good: `
      bg-gradient-to-r from-[var(--accent-secondary)]/10 to-[var(--accent-primary)]/10
      text-[var(--accent-secondary)] border-[var(--accent-secondary)]/20
      ring-2 ring-[var(--accent-secondary)]/10
    `,
    average: `
      bg-gradient-to-r from-amber-50 to-yellow-50
      text-amber-700 border-amber-200
      ring-2 ring-amber-100
      dark:from-amber-900/30 dark:to-yellow-900/30 dark:text-amber-300 dark:border-amber-700 dark:ring-amber-800/50
    `,
    poor: `
      bg-gradient-to-r from-red-50 to-rose-50
      text-red-700 border-red-200
      ring-2 ring-red-100
      dark:from-red-900/30 dark:to-rose-900/30 dark:text-red-300 dark:border-red-700 dark:ring-red-800/50
    `,

    // Status badges
    success: 'bg-green-50 text-green-700 border-green-200 ring-2 ring-green-100 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700 dark:ring-green-800/50',
    warning: 'bg-amber-50 text-amber-700 border-amber-200 ring-2 ring-amber-100 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700 dark:ring-amber-800/50',
    danger: 'bg-red-50 text-red-700 border-red-200 ring-2 ring-red-100 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700 dark:ring-red-800/50',
    info: 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border-[var(--accent-primary)]/20 ring-2 ring-[var(--accent-primary)]/10',

    // Theme badges
    purple: 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border-[var(--accent-primary)]/20 ring-2 ring-[var(--accent-primary)]/10',
    primary: `
      bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]
      text-white border-transparent shadow-md
    `,

    // Special badges
    achievement: `
      bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500
      text-amber-900 border-amber-300 shadow-lg font-bold
      dark:from-amber-600 dark:via-yellow-600 dark:to-amber-700 dark:text-amber-100 dark:border-amber-500
    `,
    streak: `
      bg-gradient-to-r from-orange-500 to-red-500
      text-white border-transparent shadow-md font-bold
      dark:from-orange-700 dark:to-red-700
    `,
    milestone: `
      bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]
      text-white border-transparent shadow-md font-bold
    `
  };

  const sizes = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm',
    xl: 'px-5 py-2 text-base'
  };

  const iconMap = {
    excellent: Award,
    good: Star,
    average: TrendingUp,
    achievement: Award,
    streak: Zap,
    milestone: Target
  };

  const IconComponent = icon || iconMap[variant];

  return (
    <span className={`
      inline-flex items-center gap-1.5
      rounded-full
      border
      font-semibold
      ${variants[variant]}
      ${sizes[size]}
      ${pulse ? 'animate-pulse-soft' : ''}
      ${className}
      transition-all duration-200
    `}>
      {dot && (
        <span className={`
          w-1.5 h-1.5 rounded-full
          ${variant === 'primary' || variant === 'achievement' || variant === 'streak' || variant === 'milestone'
            ? 'bg-white'
            : 'bg-current'
          }
          ${pulse ? 'animate-pulse' : ''}
        `} />
      )}
      {IconComponent && <IconComponent size={size === 'xs' ? 10 : size === 'sm' ? 12 : 14} />}
      {children}
    </span>
  );
};
