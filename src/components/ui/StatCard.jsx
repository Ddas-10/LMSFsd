import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * StatCard - Professional statistics card for displaying study metrics
 * Perfect for dashboards showing progress, time spent, completion rates, etc.
 */
export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendLabel,
  variant = 'default',
  className = ''
}) => {
  const variants = {
    default: 'from-[var(--bg-card)] to-[var(--section-bg)]',
    purple: 'from-[var(--accent-primary)]/10 to-[var(--accent-secondary)]/10',
    blue: 'from-[var(--accent-secondary)]/10 to-[var(--accent-primary)]/10',
    green: 'from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30',
    amber: 'from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30',
  };

  const iconColors = {
    default: 'from-[var(--accent-primary)] to-[var(--accent-secondary)]',
    purple: 'from-[var(--accent-primary)] to-[var(--accent-secondary)]',
    blue: 'from-[var(--accent-secondary)] to-[var(--accent-primary)]',
    green: 'from-emerald-600 to-green-600',
    amber: 'from-amber-600 to-orange-600',
  };

  return (
    <div className={`
      stat-card
      relative overflow-hidden
      bg-gradient-to-br ${variants[variant]}
      rounded-2xl p-6
      border border-[var(--border-color)]
      shadow-md hover:shadow-xl
      transition-all duration-300
      transform hover:-translate-y-1
      ${className}
    `}>
      {/* Icon */}
      {Icon && (
        <div className={`
          inline-flex p-3 rounded-xl mb-4
          bg-gradient-to-br ${iconColors[variant]}
          shadow-lg
        `}>
          <Icon size={24} className="text-white" />
        </div>
      )}

      {/* Value */}
      <div className="mb-2">
        <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-1">
          {value}
        </h3>
        <p className="text-sm font-semibold text-[var(--text-secondary)]">
          {title}
        </p>
      </div>

      {/* Subtitle or additional info */}
      {subtitle && (
        <p className="text-xs text-[var(--text-secondary)] mb-3">
          {subtitle}
        </p>
      )}

      {/* Trend indicator */}
      {trend !== undefined && (
        <div className={`
          inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold
          ${trend >= 0
            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
          }
        `}>
          {trend >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span>{Math.abs(trend)}%</span>
          {trendLabel && <span className="ml-1">{trendLabel}</span>}
        </div>
      )}

      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <div className={`
          w-full h-full rounded-full blur-3xl
          bg-gradient-to-br ${iconColors[variant]}
        `} />
      </div>
    </div>
  );
};
