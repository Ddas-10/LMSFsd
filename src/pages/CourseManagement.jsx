// ========== CourseManagement.jsx ==========
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ApiService } from '../services/api';
import { Card, Button, Badge, Modal, Input } from '../components/ui';
import { Plus, Edit, Trash2, Users, BookOpen, FileText, Search } from 'lucide-react';

const CourseManagement = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    level: 'Beginner',
    duration: '',
    thumbnail: ''
  });

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

  const handleCreateCourse = async () => {
    if (!newCourse.title || !newCourse.description) {
      alert('Please fill all required fields');
      return;
    }

    try {
      await ApiService.createCourse({
        ...newCourse,
        instructor: user.name
      });
      setShowCreateModal(false);
      setNewCourse({
        title: '',
        description: '',
        level: 'Beginner',
        duration: '',
        thumbnail: ''
      });
      loadCourses();
      alert('Course created successfully!');
    } catch (err) {
      alert('Failed to create course: ' + err.message);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) return;

    try {
      await ApiService.deleteCourse(courseId);
      loadCourses();
      alert('Course deleted successfully!');
    } catch (err) {
      alert('Failed to delete course: ' + err.message);
    }
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const emojiOptions = [];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-neutral-600 dark:text-neutral-300 font-medium">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-2">Course Management</h1>
          <p className="text-neutral-600 dark:text-neutral-300 text-lg">Create and manage your courses</p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowCreateModal(true)}
          icon={Plus}
          size="lg"
        >
          Create Course
        </Button>
      </div>

      {/* Search */}
      <Card>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" size={20} />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/50 transition-all"
          />
        </div>
      </Card>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <Card key={course.id} hover className="flex flex-col">
            {/* Course Header */}
            <div className="relative h-32 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl mb-4 flex items-center justify-center">
              <span className="text-6xl">{course.thumbnail}</span>
            </div>

            {/* Course Info */}
            <div className="flex-1 flex flex-col">
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-xl text-neutral-900 dark:text-white line-clamp-2">
                    {course.title}
                  </h3>
                  <Badge size="sm">{course.level}</Badge>
                </div>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm line-clamp-2 mb-3">
                  {course.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                  <Badge variant="info" size="sm">{course.duration}</Badge>
                </div>
              </div>

              {/* Course Stats */}
              <div className="flex flex-wrap gap-3 mb-4 text-xs text-neutral-600 dark:text-neutral-400">
                <span className="flex items-center gap-1">
                  <Users size={14} />
                  {course.enrolledStudents.length} students
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen size={14} />
                  {course.modules.length} modules
                </span>
                <span className="flex items-center gap-1">
                  <FileText size={14} />
                  {course.assignments.length} assignments
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-neutral-100 dark:border-neutral-700">
                <Button variant="outline" icon={Edit} className="flex-1 justify-center" size="sm">
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteCourse(course.id)}
                  icon={Trash2}
                  size="sm"
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <Card className="text-center py-16">
          <BookOpen size={64} className="mx-auto text-neutral-300 dark:text-neutral-600 mb-4" />
          <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-200 mb-2">No courses found</h3>
          <p className="text-neutral-500 dark:text-neutral-400 mb-6">
            {searchTerm ? 'Try adjusting your search' : 'Start by creating your first course'}
          </p>
          {!searchTerm && (
            <Button variant="primary" onClick={() => setShowCreateModal(true)} icon={Plus}>
              Create Course
            </Button>
          )}
        </Card>
      )}

      {/* Create Course Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setNewCourse({
            title: '',
            description: '',
            level: 'Beginner',
            duration: '',
            thumbnail: ''
          });
        }}
        title="Create New Course"
      >
        <div>
          <Input
            label="Course Title"
            value={newCourse.title}
            onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
            required
            placeholder="e.g., Introduction to Python Programming"
          />
          
          <div className="mb-5">
            <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-200 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={newCourse.description}
              onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
              className="w-full px-4 py-3 border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/50 transition-all resize-none"
              rows={4}
              placeholder="Describe what students will learn in this course..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-200 mb-2">
                Level
              </label>
              <select
                value={newCourse.level}
                onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })}
                className="w-full px-4 py-3 border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/50 transition-all"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            <Input
              label="Duration"
              value={newCourse.duration}
              onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
              placeholder="e.g., 8 weeks"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-200 mb-3">
              Course Icon
            </label>
            <div className="grid grid-cols-5 gap-3">
              {emojiOptions.map(emoji => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setNewCourse({ ...newCourse, thumbnail: emoji })}
                  className={`p-4 text-3xl rounded-xl border-2 transition-all hover:scale-110 ${
                    newCourse.thumbnail === emoji
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                      : 'border-neutral-200 dark:border-neutral-700 hover:border-blue-300 dark:hover:border-blue-600'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="primary" 
              onClick={handleCreateCourse}
              size="lg"
              icon={Plus}
            >
              Create Course
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setShowCreateModal(false);
                setNewCourse({
                  title: '',
                  description: '',
                  level: 'Beginner',
                  duration: '',
                  thumbnail: ''
                });
              }}
              size="lg"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CourseManagement;