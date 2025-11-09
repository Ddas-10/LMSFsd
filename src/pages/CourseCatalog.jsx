import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ApiService } from '../services/api';
import { Card, Button, Badge } from '../components/ui';
import { Search, Filter, BookOpen, Clock, Users, Star, CheckCircle } from 'lucide-react';

const CourseCatalog = () => {
  const { user, updateUser } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('All');

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const allCourses = await ApiService.fetchCourses();
      setCourses(allCourses);
    } catch (err) {
      console.error('Failed to load courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    setEnrolling(courseId);
    try {
      const updatedUser = await ApiService.enrollInCourse(user.id, courseId);
      updateUser(updatedUser);
    } catch (err) {
      alert('Enrollment failed: ' + err.message);
    } finally {
      setEnrolling(null);
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterLevel === 'All' || course.level === filterLevel;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-neutral-600 font-medium">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-neutral-900 mb-2">Explore Courses</h1>
        <p className="text-neutral-600 text-lg">Discover your next learning adventure</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all bg-white"
            >
              <option>All</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <Button variant="ghost" icon={Filter}>
              More Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-neutral-600">
          Showing <span className="font-semibold text-neutral-900">{filteredCourses.length}</span> courses
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => {
          const isEnrolled = user.enrolledCourses.includes(course.id);
          const rating = 4.5 + Math.random() * 0.5; // Mock rating
          
          return (
            <Card key={course.id} hover className="flex flex-col h-full group">
              {/* Course Thumbnail */}
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                <span className="text-7xl group-hover:scale-110 transition-transform duration-300">
                  {course.thumbnail}
                </span>
                {isEnrolled && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                    <CheckCircle size={14} />
                    Enrolled
                  </div>
                )}
              </div>

              {/* Course Info */}
              <div className="flex-1 flex flex-col">
                <div className="mb-3">
                  <div className="flex items-start justify-between mb-2">
                    <Badge size="sm">{course.level}</Badge>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star size={14} fill="currentColor" />
                      <span className="text-sm font-semibold text-neutral-700">{rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-xl text-neutral-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-neutral-600 text-sm mb-3 line-clamp-2">
                    {course.description}
                  </p>
                </div>

                {/* Course Meta */}
                <div className="flex flex-wrap gap-3 text-xs text-neutral-500 mb-4">
                  <span className="flex items-center gap-1">
                    <BookOpen size={14} />
                    {course.modules.length} modules
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={14} />
                    {course.enrolledStudents.length} students
                  </span>
                </div>

                <div className="pt-3 border-t border-neutral-100">
                  <p className="text-sm text-neutral-600 mb-3">
                    Instructor: <span className="font-semibold text-neutral-900">{course.instructor}</span>
                  </p>
                  
                  {isEnrolled ? (
                    <Button variant="secondary" fullWidth>
                      Continue Learning
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() => handleEnroll(course.id)}
                      disabled={enrolling === course.id}
                      loading={enrolling === course.id}
                      fullWidth
                    >
                      Enroll Now
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <Card className="text-center py-16">
          <BookOpen size={64} className="mx-auto text-neutral-300 mb-4" />
          <h3 className="text-xl font-semibold text-neutral-700 mb-2">No courses found</h3>
          <p className="text-neutral-500">Try adjusting your search or filters</p>
        </Card>
      )}
    </div>
  );
};

export default CourseCatalog;