import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const ProgressBar = ({ 
  progress, 
  className = '', 
  showLabel = true,
  showTrend = false,
  previousProgress = null,
  size = 'md'
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  
  const getProgressStatus = (progress) => {
    if (progress >= 90) return { color: 'emerald', label: 'Excellent', gradient: 'from-emerald-400 to-green-500' };
    if (progress >= 75) return { color: 'green', label: 'Great', gradient: 'from-green-400 to-emerald-500' };
    if (progress >= 50) return { color: 'blue', label: 'Good', gradient: 'from-blue-400 to-cyan-500' };
    if (progress >= 25) return { color: 'amber', label: 'Fair', gradient: 'from-amber-400 to-orange-500' };
    return { color: 'red', label: 'Needs Work', gradient: 'from-red-400 to-rose-500' };
  };

  const status = getProgressStatus(clampedProgress);
  const trend = previousProgress !== null ? clampedProgress - previousProgress : 0;
  
  const heights = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-neutral-700">{status.label}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-neutral-900">{clampedProgress}%</span>
            {showTrend && trend !== 0 && (
              <span className={`flex items-center text-xs font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {trend > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {Math.abs(trend)}%
              </span>
            )}
          </div>
        </div>
      )}
      <div className={`w-full bg-neutral-200 rounded-full ${heights[size]} overflow-hidden relative`}>
        <div
          className={`${heights[size]} rounded-full transition-all duration-700 ease-out bg-gradient-to-r ${status.gradient} relative overflow-hidden`}
          style={{ width: `${clampedProgress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
};