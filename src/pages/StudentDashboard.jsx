import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ApiService } from '../services/api';
import { Card, Badge, ProgressBar, Button } from '../components/ui';
import { 
  BookOpen, Award, TrendingUp, Clock, Target, 
  ArrowRight, Calendar, CheckCircle2, AlertCircle 
} from 'lucide-react';

// Add to StudentDashboard.jsx


const StudentDashboard = () => {
  const { user, refreshUser } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
    refreshUser(); // Refresh user data from localStorage
  }, []);

  

  const loadCourses = async () => {
    try {
      const allCourses = await ApiService.fetchCourses();
      const enrolledCourses = allCourses.filter(c => 
        user.enrolledCourses.includes(c.id)
      );
      setCourses(enrolledCourses);
    } catch (err) {
      console.error('Failed to load courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateAverageGrade = () => {
    let total = 0;
    let count = 0;
    Object.values(user.assignments || {}).forEach(courseAssignments => {
      Object.values(courseAssignments).forEach(assignment => {
        if (assignment.grade) {
          total += assignment.grade;
          count++;
        }
      });
    });
    return count > 0 ? (total / count).toFixed(1) : 'N/A';
  };

  const calculateAverageProgress = () => {
    const progressValues = Object.values(user.progress);
    if (progressValues.length === 0) return 0;
    return Math.round(progressValues.reduce((a, b) => a + b, 0) / progressValues.length);
  };

  const getUpcomingDeadlines = () => {
    const deadlines = [];
    courses.forEach(course => {
      course.assignments.forEach(assignment => {
        const submission = user.assignments?.[course.id]?.[assignment.id];
        if (!submission?.submitted) {
          deadlines.push({
            courseTitle: course.title,
            assignmentTitle: assignment.title,
            dueDate: assignment.dueDate,
            courseThumbnail: course.thumbnail
          });
        }
      });
    });
    return deadlines.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)).slice(0, 3);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-neutral-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const avgProgress = calculateAverageProgress();
  const avgGrade = calculateAverageGrade();
  const upcomingDeadlines = getUpcomingDeadlines();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden">
        <Card className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white border-0 shadow-xl" padding="lg">
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                  Welcome back, {user.name.split(' ')[0]}! 👋
                </h1>
                <p className="text-blue-100 text-lg mb-6">
                  Ready to continue your learning journey?
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                    <p className="text-blue-100 text-xs mb-1">Current Streak</p>
                    <p className="text-2xl font-bold">7 days 🔥</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                    <p className="text-blue-100 text-xs mb-1">Total Study Time</p>
                    <p className="text-2xl font-bold">24h 15m ⏱️</p>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <Target size={120} className="opacity-20" />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card hover className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
              <BookOpen className="text-white" size={24} />
            </div>
            <TrendingUp className="text-blue-600" size={20} />
          </div>
          <div>
            <p className="text-neutral-600 text-sm font-semibold mb-1">Enrolled Courses</p>
            <p className="text-4xl font-bold text-neutral-900">{user.enrolledCourses.length}</p>
            <p className="text-xs text-green-600 font-medium mt-2">+2 this month</p>
          </div>
        </Card>

        <Card hover className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl shadow-lg">
              <Award className="text-white" size={24} />
            </div>
            <TrendingUp className="text-green-600" size={20} />
          </div>
          <div>
            <p className="text-neutral-600 text-sm font-semibold mb-1">Avg Grade</p>
            <p className="text-4xl font-bold text-neutral-900">{avgGrade}</p>
            <p className="text-xs text-green-600 font-medium mt-2">+5.2% from last week</p>
          </div>
        </Card>

        <Card hover className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl shadow-lg">
              <Target className="text-white" size={24} />
            </div>
            <TrendingUp className="text-purple-600" size={20} />
          </div>
          <div>
            <p className="text-neutral-600 text-sm font-semibold mb-1">Avg Progress</p>
            <p className="text-4xl font-bold text-neutral-900">{avgProgress}%</p>
            <p className="text-xs text-purple-600 font-medium mt-2">Keep it up!</p>
          </div>
        </Card>

        <Card hover className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl shadow-lg">
              <Clock className="text-white" size={24} />
            </div>
            <AlertCircle className="text-amber-600" size={20} />
          </div>
          <div>
            <p className="text-neutral-600 text-sm font-semibold mb-1">Pending Tasks</p>
            <p className="text-4xl font-bold text-neutral-900">{upcomingDeadlines.length}</p>
            <p className="text-xs text-amber-600 font-medium mt-2">Due this week</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Courses Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-neutral-900">My Courses</h2>
            <Button variant="ghost" size="sm">
              View All <ArrowRight size={16} />
            </Button>
          </div>

          {courses.length === 0 ? (
            <Card className="text-center py-16">
              <BookOpen size={64} className="mx-auto text-neutral-300 mb-4" />
              <h3 className="text-xl font-semibold text-neutral-700 mb-2">No courses yet</h3>
              <p className="text-neutral-500 mb-6">Start your learning journey by exploring our catalog</p>
              <Button variant="primary">Browse Courses</Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {courses.map(course => {
                const progress = user.progress[course.id] || 0;
                return (
                  <Card key={course.id} hover className="group">
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0 group-hover:scale-110 transition-transform">
                        {course.thumbnail}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-neutral-900 mb-1 group-hover:text-blue-600 transition-colors">
                              {course.title}
                            </h3>
                            <p className="text-sm text-neutral-500 mb-2">{course.instructor}</p>
                          </div>
                          <Badge variant={progress >= 75 ? 'success' : 'default'}>
                            {course.level}
                          </Badge>
                        </div>
                        <p className="text-neutral-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                        <ProgressBar 
                          progress={progress} 
                          showLabel={true}
                          size="md"
                        />
                        <div className="flex items-center gap-4 mt-4 text-xs text-neutral-500">
                          <span className="flex items-center gap-1">
                            <BookOpen size={14} />
                            {course.modules.length} modules
                          </span>
                          <span className="flex items-center gap-1">
                            <CheckCircle2 size={14} />
                            {course.assignments.length} assignments
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {course.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Deadlines */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="text-blue-600" size={20} />
              <h3 className="font-bold text-lg text-neutral-900">Upcoming Deadlines</h3>
            </div>
            {upcomingDeadlines.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle2 className="mx-auto text-green-500 mb-2" size={48} />
                <p className="text-neutral-600 text-sm">All caught up! 🎉</p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingDeadlines.map((deadline, idx) => (
                  <div key={idx} className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{deadline.courseThumbnail}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-neutral-900 text-sm mb-1 truncate">
                          {deadline.assignmentTitle}
                        </p>
                        <p className="text-xs text-neutral-600 mb-2">{deadline.courseTitle}</p>
                        <div className="flex items-center gap-1 text-xs text-amber-700 font-medium">
                          <Clock size={12} />
                          Due {new Date(deadline.dueDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Quick Stats */}
          <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
            <h3 className="font-bold text-lg text-neutral-900 mb-4">This Week</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 text-sm">Modules Completed</span>
                <span className="font-bold text-neutral-900 text-lg">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 text-sm">Quizzes Taken</span>
                <span className="font-bold text-neutral-900 text-lg">5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 text-sm">Study Hours</span>
                <span className="font-bold text-neutral-900 text-lg">8.5h</span>
              </div>
            </div>
          </Card>

          {/* Motivational Card */}
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="mb-3">
              <h3 className="font-bold text-xl mb-2">Keep Going! 🚀</h3>
              <p className="text-blue-100 text-sm">
                You're doing great! Complete 3 more modules to reach your weekly goal.
              </p>
            </div>
            <ProgressBar progress={70} showLabel={false} className="mb-3" />
            <p className="text-xs text-blue-100">70% of weekly goal achieved</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;