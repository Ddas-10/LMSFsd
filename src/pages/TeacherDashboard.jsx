import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ApiService } from '../services/api';
import { Card, Badge } from '../components/ui';
import { 
  BookOpen, Users, FileText, TrendingUp, Award, 
  Clock, CheckCircle, AlertCircle, Target 
} from 'lucide-react';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const allCourses = await ApiService.fetchCourses();
      const managedCourses = allCourses.filter(c => 
        user.managedCourses.includes(c.id)
      );
      setCourses(managedCourses);
    } catch (err) {
      console.error('Failed to load courses:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-neutral-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const totalStudents = courses.reduce((sum, course) => sum + course.enrolledStudents.length, 0);
  const totalAssignments = courses.reduce((sum, course) => sum + course.assignments.length, 0);
  const totalModules = courses.reduce((sum, course) => sum + course.modules.length, 0);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white border-0 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Welcome back, {user.name.split(' ')[0]}! 👋</h1>
            <p className="text-white/90 text-lg">Here's what's happening with your courses today</p>
          </div>
          <Target size={80} className="opacity-20 hidden lg:block" />
        </div>
      </Card>

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
            <p className="text-neutral-600 text-sm font-semibold mb-1">Total Courses</p>
            <p className="text-4xl font-bold text-neutral-900">{courses.length}</p>
            <p className="text-xs text-blue-600 font-medium mt-2">Active courses</p>
          </div>
        </Card>

        <Card hover className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl shadow-lg">
              <Users className="text-white" size={24} />
            </div>
            <TrendingUp className="text-green-600" size={20} />
          </div>
          <div>
            <p className="text-neutral-600 text-sm font-semibold mb-1">Total Students</p>
            <p className="text-4xl font-bold text-neutral-900">{totalStudents}</p>
            <p className="text-xs text-green-600 font-medium mt-2">Enrolled learners</p>
          </div>
        </Card>

        <Card hover className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl shadow-lg">
              <FileText className="text-white" size={24} />
            </div>
            <AlertCircle className="text-purple-600" size={20} />
          </div>
          <div>
            <p className="text-neutral-600 text-sm font-semibold mb-1">Assignments</p>
            <p className="text-4xl font-bold text-neutral-900">{totalAssignments}</p>
            <p className="text-xs text-purple-600 font-medium mt-2">Pending review: 3</p>
          </div>
        </Card>

        <Card hover className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl shadow-lg">
              <Award className="text-white" size={24} />
              </div>
            <CheckCircle className="text-amber-600" size={20} />
          </div>
          <div>
            <p className="text-neutral-600 text-sm font-semibold mb-1">Modules</p>
            <p className="text-4xl font-bold text-neutral-900">{totalModules}</p>
            <p className="text-xs text-amber-600 font-medium mt-2">Total content</p>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Courses Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-neutral-900">My Courses</h2>
          </div>

          {courses.length === 0 ? (
            <Card className="text-center py-16">
              <BookOpen size={64} className="mx-auto text-neutral-300 mb-4" />
              <h3 className="text-xl font-semibold text-neutral-700 mb-2">No courses yet</h3>
              <p className="text-neutral-500">Start by creating your first course</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {courses.map(course => (
                <Card key={course.id} hover className="group">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0 group-hover:scale-110 transition-transform">
                      {course.thumbnail}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-xl text-neutral-900 mb-1 group-hover:text-blue-600 transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-sm text-neutral-500">{course.instructor}</p>
                        </div>
                        <Badge>{course.level}</Badge>
                      </div>
                      <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                        {course.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2 text-neutral-600">
                          <Users size={16} />
                          <span className="font-semibold">{course.enrolledStudents.length}</span>
                          <span className="text-neutral-500">students</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-600">
                          <BookOpen size={16} />
                          <span className="font-semibold">{course.modules.length}</span>
                          <span className="text-neutral-500">modules</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-600">
                          <FileText size={16} />
                          <span className="font-semibold">{course.assignments.length}</span>
                          <span className="text-neutral-500">assignments</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-600">
                          <Clock size={16} />
                          <span className="font-semibold">{course.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pending Tasks */}
          <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="text-red-600" size={20} />
              <h3 className="font-bold text-lg text-neutral-900">Pending Tasks</h3>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-white rounded-xl border border-red-100">
                <p className="font-semibold text-neutral-900 text-sm mb-1">Grade Assignments</p>
                <p className="text-xs text-neutral-600">3 submissions pending</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-orange-100">
                <p className="font-semibold text-neutral-900 text-sm mb-1">Course Updates</p>
                <p className="text-xs text-neutral-600">2 courses need attention</p>
              </div>
            </div>
          </Card>

          {/* This Week */}
          <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
            <h3 className="font-bold text-lg text-neutral-900 mb-4">This Week</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 text-sm">New Enrollments</span>
                <span className="font-bold text-neutral-900 text-lg">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 text-sm">Submissions</span>
                <span className="font-bold text-neutral-900 text-lg">28</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 text-sm">Avg Grade</span>
                <span className="font-bold text-neutral-900 text-lg">85%</span>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <h3 className="font-bold text-lg text-neutral-900 mb-4">Course Performance</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 text-sm">Completion Rate</span>
                <span className="font-bold text-green-600 text-lg">78%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 text-sm">Student Satisfaction</span>
                <span className="font-bold text-green-600 text-lg">4.8/5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 text-sm">Active Students</span>
                <span className="font-bold text-green-600 text-lg">92%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;