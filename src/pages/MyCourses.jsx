import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ApiService } from '../services/api';
import { Card, Badge, ProgressBar, Button } from '../components/ui';
import { BookOpen, Clock, Target, TrendingUp, ArrowRight } from 'lucide-react';

const MyCourses = ({ onSelectCourse }) => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMyCourses();
  }, [user.enrolledCourses]);

  const loadMyCourses = async () => {
    try {
      const allCourses = await ApiService.fetchCourses();
      const myCourses = allCourses.filter(c => user.enrolledCourses?.includes(c.id));
      setCourses(myCourses);
    } catch (err) {
      console.error('Failed to load courses:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600"></div>
      </div>
    );
  }

  if (user.enrolledCourses?.length === 0 || courses.length === 0) {
    return (
      <div className="text-center py-20">
        <Card className="max-w-2xl mx-auto">
          <BookOpen size={80} className="mx-auto text-neutral-300 mb-6" />
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">No Courses Yet</h2>
          <p className="text-neutral-600 text-lg mb-8">
            Start your learning journey by exploring our course catalog
          </p>
          <Button variant="primary" size="lg">
            Browse Courses
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">My Learning</h1>
          <p className="text-neutral-600 text-lg">Continue where you left off</p>
        </div>
        <Button variant="ghost" icon={Target}>
          Learning Goals
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary-50 to-accent-50 border-primary-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-neutral-700">In Progress</h3>
            <TrendingUp className="text-primary-600" size={20} />
          </div>
          <p className="text-4xl font-bold text-neutral-900">
            {user.enrolledCourses?.filter(id => {
              const progress = user.progress[id] || 0;
              return progress > 0 && progress < 100;
            }).length || 0}
          </p>
          <p className="text-sm text-neutral-600 mt-2">Active courses</p>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-neutral-700">Completed</h3>
            <Target className="text-green-600" size={20} />
          </div>
          <p className="text-4xl font-bold text-neutral-900">
            {user.enrolledCourses?.filter(id => user.progress[id] === 100).length || 0}
          </p>
          <p className="text-sm text-neutral-600 mt-2">Finished courses</p>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-neutral-700">Not Started</h3>
            <Clock className="text-amber-600" size={20} />
          </div>
          <p className="text-4xl font-bold text-neutral-900">
            {user.enrolledCourses?.filter(id => !user.progress[id] || user.progress[id] === 0).length || 0}
          </p>
          <p className="text-sm text-neutral-600 mt-2">Ready to begin</p>
        </Card>
      </div>

      {/* Courses Grid */}
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">All Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map(course => {
            const progress = user.progress[course.id] || 0;

            return (
              <Card 
                key={course.id}
                hover
                className="group cursor-pointer"
                onClick={() => onSelectCourse(course.id)}
              >
                <div className="flex gap-4 mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center text-5xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {course.thumbnail}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-xl text-neutral-900 group-hover:text-primary-600 transition-colors">
                        {course.title}
                      </h3>
                      <Badge variant={progress >= 75 ? 'success' : 'default'}>
                        {course.level}
                      </Badge>
                    </div>
                    <p className="text-sm text-neutral-500 mb-3">{course.instructor}</p>
                  </div>
                </div>

                <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                <ProgressBar 
                  progress={progress}
                  showLabel={true}
                  size="md"
                  className="mb-4"
                />

                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                  <div className="flex items-center gap-4 text-xs text-neutral-500">
                    <span className="flex items-center gap-1">
                      <BookOpen size={14} />
                      {course.modules.length} modules
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {course.duration}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" icon={ArrowRight}>
                    Continue
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;