import React from 'react';
import { Clock, BookOpen, Award, Calendar, TrendingUp } from 'lucide-react';
import { ProgressBar } from './ProgressBar';
import { Badge } from './Badge';

/**
 * CourseCard - Enhanced course card for study tracking
 * Shows progress, time spent, completion status, and upcoming deadlines
 */
export const CourseCard = ({
  title,
  description,
  progress = 0,
  timeSpent,
  totalTime,
  lessonsCompleted,
  totalLessons,
  instructor,
  nextDeadline,
  difficulty,
  category,
  onClick,
  className = '',
  variant = 'default'
}) => {
  const variants = {
    default: 'from-[var(--bg-card)] to-[var(--section-bg)]',
    featured: 'from-[var(--accent-primary)]/10 via-[var(--bg-card)] to-[var(--accent-secondary)]/10',
    inProgress: 'from-[var(--accent-secondary)]/10 via-[var(--bg-card)] to-[var(--accent-primary)]/10',
    completed: 'from-emerald-50 via-[var(--bg-card)] to-green-50 dark:from-emerald-900/30 dark:via-[var(--bg-card)] dark:to-green-900/30'
  };

  const difficultyColors = {
    beginner: 'success',
    intermediate: 'warning',
    advanced: 'danger'
  };

  return (
    <div
      onClick={onClick}
      className={`
        course-card
        relative overflow-hidden
        bg-gradient-to-br ${variants[variant]}
        border border-[var(--border-color)]
        shadow-md hover:shadow-2xl
        transition-all duration-300
        transform hover:-translate-y-2
        cursor-pointer
        ${className}
      `}
    >
      {/* Header Section */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 line-clamp-2">
              {title}
            </h3>
            {instructor && (
              <p className="text-sm text-[var(--text-secondary)] mb-2">
                by {instructor}
              </p>
            )}
          </div>
          {progress === 100 && (
            <div className="ml-2">
              <Badge variant="achievement" size="md">
                <Award size={12} />
                Complete
              </Badge>
            </div>
          )}
        </div>

        {description && (
          <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-4">
            {description}
          </p>
        )}

        {/* Metadata badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {category && (
            <Badge variant="purple" size="sm">
              {category}
            </Badge>
          )}
          {difficulty && (
            <Badge variant={difficultyColors[difficulty]} size="sm">
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </Badge>
          )}
        </div>
      </div>

      {/* Progress Section */}
      <div className="px-6 pb-4">
        <ProgressBar
          progress={progress}
          showLabel={true}
          showIcon={true}
          academicMode={true}
          size="md"
        />
      </div>

      {/* Stats Grid */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Lessons Progress */}
          {lessonsCompleted !== undefined && totalLessons && (
            <div className="flex items-center gap-2 text-sm">
              <div className="p-2 rounded-lg bg-[var(--accent-secondary)]/20">
                <BookOpen size={16} className="text-[var(--accent-secondary)]" />
              </div>
              <div>
                <p className="font-semibold text-[var(--text-primary)]">
                  {lessonsCompleted}/{totalLessons}
                </p>
                <p className="text-xs text-[var(--text-secondary)]">Lessons</p>
              </div>
            </div>
          )}

          {/* Time Spent */}
          {timeSpent && (
            <div className="flex items-center gap-2 text-sm">
              <div className="p-2 rounded-lg bg-[var(--accent-primary)]/20">
                <Clock size={16} className="text-[var(--accent-primary)]" />
              </div>
              <div>
                <p className="font-semibold text-[var(--text-primary)]">{timeSpent}</p>
                <p className="text-xs text-[var(--text-secondary)]">
                  {totalTime ? `of ${totalTime}` : 'Time spent'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Next Deadline (if applicable) */}
      {nextDeadline && (
        <div className="px-6 pb-6">
          <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200 dark:bg-amber-900/30 dark:border-amber-700">
            <Calendar size={16} className="text-amber-600 dark:text-amber-400" />
            <div className="flex-1">
              <p className="text-xs font-semibold text-amber-900 dark:text-amber-100">Next Deadline</p>
              <p className="text-sm font-bold text-amber-700 dark:text-amber-200">{nextDeadline}</p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom gradient decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};
