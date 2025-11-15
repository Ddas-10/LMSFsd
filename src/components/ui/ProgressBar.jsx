import React from 'react';
import { TrendingUp, TrendingDown, Target, Award } from 'lucide-react';

export const ProgressBar = ({
  progress,
  className = '',
  showLabel = true,
  showTrend = false,
  previousProgress = null,
  size = 'md',
  showIcon = true,
  academicMode = true
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  const getProgressStatus = (progress) => {
    if (progress >= 90) return {
      color: 'emerald',
      label: 'Outstanding',
      gradient: 'from-emerald-500 via-green-500 to-emerald-600',
      bgGradient: 'from-emerald-50 to-green-50',
      icon: Award,
      description: 'Excellent mastery'
    };
    if (progress >= 75) return {
      color: 'blue',
      label: 'Proficient',
      gradient: 'from-blue-500 via-cyan-500 to-blue-600',
      bgGradient: 'from-blue-50 to-cyan-50',
      icon: Target,
      description: 'Strong understanding'
    };
    if (progress >= 60) return {
      color: 'indigo',
      label: 'Developing',
      gradient: 'from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-primary)]',
      bgGradient: 'from-[var(--accent-primary)]/10 to-[var(--accent-secondary)]/10',
      icon: TrendingUp,
      description: 'Good progress'
    };
    if (progress >= 40) return {
      color: 'amber',
      label: 'Emerging',
      gradient: 'from-amber-500 via-yellow-500 to-amber-600',
      bgGradient: 'from-amber-50 to-yellow-50',
      icon: TrendingUp,
      description: 'Keep practicing'
    };
    return {
      color: 'red',
      label: 'Beginning',
      gradient: 'from-red-500 via-rose-500 to-red-600',
      bgGradient: 'from-red-50 to-rose-50',
      icon: Target,
      description: 'Needs focus'
    };
  };

  const status = getProgressStatus(clampedProgress);
  const trend = previousProgress !== null ? clampedProgress - previousProgress : 0;
  const StatusIcon = status.icon;

  const heights = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-5'
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {showIcon && academicMode && (
              <div className={`p-1.5 rounded-lg bg-gradient-to-br ${status.bgGradient}`}>
                <StatusIcon size={16} className={`text-${status.color}-600`} />
              </div>
            )}
            <div>
              <span className="text-sm font-bold text-[var(--text-primary)]">{status.label}</span>
              {academicMode && (
                <p className="text-xs text-[var(--text-secondary)]">{status.description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
              {clampedProgress}%
            </span>
            {showTrend && trend !== 0 && (
              <span className={`
                flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full
                ${trend > 0
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                }
              `}>
                {trend > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {Math.abs(trend)}%
              </span>
            )}
          </div>
        </div>
      )}
      <div className={`w-full bg-[var(--border-color)] rounded-full ${heights[size]} overflow-hidden relative shadow-inner`}>
        <div
          className={`
            ${heights[size]}
            rounded-full
            transition-all
            duration-1000
            ease-out
            bg-gradient-to-r
            ${status.gradient}
            relative
            overflow-hidden
            shadow-sm
          `}
          style={{ width: `${clampedProgress}%` }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>

          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm"></div>
        </div>
      </div>

      {/* Milestone markers for academic mode */}
      {academicMode && size === 'lg' && (
        <div className="flex justify-between mt-2 px-1">
          {[25, 50, 75, 100].map((milestone) => (
            <div
              key={milestone}
              className={`text-xs font-medium ${
                clampedProgress >= milestone
                  ? 'text-[var(--accent-primary)]'
                  : 'text-[var(--text-secondary)]'
              }`}
            >
              {milestone}%
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
