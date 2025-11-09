import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ApiService } from '../services/api';
import { Card, Button, Badge, ProgressBar, Modal, Input } from '../components/ui';
import { 
  CheckCircle, Upload, Download, PlayCircle, FileText, 
  Award, Clock, AlertCircle, ChevronDown, ChevronUp 
} from 'lucide-react';

const CourseView = ({ courseId }) => {
  const { user, updateUser } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionText, setSubmissionText] = useState('');
  const [expandedModules, setExpandedModules] = useState({});

  useEffect(() => {
    loadCourse();
  }, [courseId]);

  const loadCourse = async () => {
    try {
      const courseData = await ApiService.fetchCourseById(courseId);
      setCourse(courseData);
      // Expand first module by default
      setExpandedModules({ [courseData.modules[0]?.id]: true });
    } catch (err) {
      console.error('Failed to load course:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleModuleComplete = async (moduleId) => {
    const moduleIndex = course.modules.findIndex(m => m.id === moduleId);
    const progress = Math.round(((moduleIndex + 1) / course.modules.length) * 100);
    
    try {
      const updatedUser = await ApiService.updateProgress(user.id, courseId, progress);
      updateUser(updatedUser);
    } catch (err) {
      console.error('Failed to update progress:', err);
    }
  };

  const handleSubmitAssignment = async () => {
    if (!submissionText.trim()) {
      alert('Please enter your submission');
      return;
    }

    setSubmitting(true);
    try {
      const updatedUser = await ApiService.submitAssignment(
        user.id,
        courseId,
        selectedAssignment.id,
        submissionText
      );
      updateUser(updatedUser);
      setSubmissionText('');
      setSelectedAssignment(null);
      alert('Assignment submitted successfully!');
    } catch (err) {
      alert('Submission failed: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-neutral-600 font-medium">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <Card className="text-center py-20">
        <AlertCircle size={64} className="mx-auto text-red-400 mb-4" />
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Course Not Found</h2>
        <p className="text-neutral-600">The course you're looking for doesn't exist.</p>
      </Card>
    );
  }

  const progress = user.progress[courseId] || 0;

  return (
    <div className="space-y-8">
      {/* Course Header */}
      <Card className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white border-0 shadow-xl">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center text-7xl flex-shrink-0">
            {course.thumbnail}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <Badge variant="primary" size="lg" className="mb-3">
                  {course.level}
                </Badge>
                <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
                <p className="text-blue-100 text-lg mb-4">{course.instructor}</p>
              </div>
            </div>
            <p className="text-white/90 text-lg mb-6">{course.description}</p>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText size={18} />
                <span>{course.modules.length} modules</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={18} />
                <span>{course.assignments.length} assignments</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Progress Card */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-neutral-900">Your Progress</h2>
          <Badge variant={progress === 100 ? 'success' : 'info'} size="lg">
            {progress === 100 ? 'Completed' : 'In Progress'}
          </Badge>
        </div>
        <ProgressBar 
          progress={progress}
          showLabel={true}
          size="lg"
        />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Modules */}
          <Card>
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Course Content</h2>
            <div className="space-y-3">
              {course.modules.map((module, index) => {
                const isExpanded = expandedModules[module.id];
                const isCompleted = progress >= ((index + 1) / course.modules.length) * 100;

                return (
                  <div key={module.id} className="border-2 border-neutral-200 rounded-xl overflow-hidden hover:border-blue-300 transition-colors">
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-neutral-50 to-white hover:from-blue-50 hover:to-indigo-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          isCompleted 
                            ? 'bg-green-500 text-white' 
                            : 'bg-neutral-200 text-neutral-600'
                        }`}>
                          {isCompleted ? <CheckCircle size={20} /> : index + 1}
                        </div>
                        <div className="text-left">
                          <h3 className="font-bold text-lg text-neutral-900">
                            {module.title}
                          </h3>
                          <p className="text-sm text-neutral-500">{module.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {isCompleted && (
                          <Badge variant="success" size="sm">
                            Completed
                          </Badge>
                        )}
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-6 py-5 bg-white border-t-2 border-neutral-100">
                        <p className="text-neutral-700 mb-6 leading-relaxed">
                          {module.content}
                        </p>
                        <div className="flex gap-3">
                          <Button variant="primary" icon={PlayCircle} size="sm">
                            Start Lesson
                          </Button>
                          <Button variant="secondary" icon={Download} size="sm">
                            Resources
                          </Button>
                          {!isCompleted && (
                            <Button 
                              variant="success" 
                              icon={CheckCircle}
                              onClick={() => handleModuleComplete(module.id)}
                              size="sm"
                            >
                              Mark Complete
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Assignments */}
          <Card>
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Assignments</h2>
            {course.assignments.length === 0 ? (
              <div className="text-center py-8">
                <FileText size={48} className="mx-auto text-neutral-300 mb-3" />
                <p className="text-neutral-600">No assignments for this course yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {course.assignments.map(assignment => {
                  const submission = user.assignments?.[courseId]?.[assignment.id];
                  const isSubmitted = submission?.submitted;
                  const isGraded = submission?.grade !== null && submission?.grade !== undefined;

                  return (
                    <div key={assignment.id} className="border-2 border-neutral-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-xl text-neutral-900 mb-2">
                            {assignment.title}
                          </h3>
                          <p className="text-neutral-600 text-sm mb-3">
                            {assignment.description}
                          </p>
                        </div>
                        <Badge 
                          variant={isGraded ? 'success' : isSubmitted ? 'info' : 'warning'}
                          size="lg"
                        >
                          {isGraded ? 'Graded' : isSubmitted ? 'Submitted' : 'Pending'}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
                        <span className="flex items-center gap-2 text-neutral-600">
                          <Clock size={16} />
                          Due: {new Date(assignment.dueDate).toLocaleDateString('en-US', { 
                            month: 'long', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </span>
                        <span className="flex items-center gap-2 text-neutral-600">
                          <Award size={16} />
                          {assignment.points} points
                        </span>
                        {isGraded && (
                          <Badge variant="success" size="lg">
                            Score: {submission.grade}/{assignment.points}
                          </Badge>
                        )}
                      </div>

                      {!isSubmitted ? (
                        <Button
                          variant="primary"
                          onClick={() => setSelectedAssignment(assignment)}
                          icon={Upload}
                        >
                          Submit Assignment
                        </Button>
                      ) : (
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                          <div className="flex items-start gap-3">
                            <CheckCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                            <div className="flex-1">
                              <p className="font-semibold text-blue-900 mb-1">
                                Submitted on {new Date(submission.submissionDate).toLocaleDateString()}
                              </p>
                              {submission.feedback && (
                                <div className="mt-3 p-3 bg-white rounded-lg">
                                  <p className="text-sm font-semibold text-neutral-900 mb-1">
                                    Teacher Feedback:
                                  </p>
                                  <p className="text-sm text-neutral-700">{submission.feedback}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Course Stats */}
          <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
            <h3 className="font-bold text-lg text-neutral-900 mb-4">Course Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 text-sm">Completion</span>
                <span className="font-bold text-neutral-900 text-lg">{progress}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 text-sm">Modules Done</span>
                <span className="font-bold text-neutral-900 text-lg">
                  {Math.floor((progress / 100) * course.modules.length)}/{course.modules.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 text-sm">Assignments</span>
                <span className="font-bold text-neutral-900 text-lg">
                  {Object.values(user.assignments?.[courseId] || {}).filter(a => a.submitted).length}/{course.assignments.length}
                </span>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <h3 className="font-bold text-lg text-neutral-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" fullWidth icon={Download}>
                Download Materials
              </Button>
              <Button variant="outline" fullWidth icon={FileText}>
                View Syllabus
              </Button>
              <Button variant="outline" fullWidth icon={Award}>
                Certificate
              </Button>
            </div>
          </Card>

          {/* Instructor Info */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <h3 className="font-bold text-lg text-neutral-900 mb-4">Instructor</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {course.instructor.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-neutral-900">{course.instructor}</p>
                <p className="text-sm text-neutral-600">Course Instructor</p>
              </div>
            </div>
            <Button variant="primary" fullWidth size="sm">
              Contact Instructor
            </Button>
          </Card>
        </div>
      </div>

      {/* Assignment Submission Modal */}
      <Modal
        isOpen={!!selectedAssignment}
        onClose={() => {
          setSelectedAssignment(null);
          setSubmissionText('');
        }}
        title={`Submit: ${selectedAssignment?.title}`}
      >
        <div>
          <div className="mb-6 p-4 bg-neutral-50 rounded-xl">
            <p className="text-neutral-700 mb-2">{selectedAssignment?.description}</p>
            <div className="flex gap-4 text-sm text-neutral-600 mt-3">
              <span className="flex items-center gap-1">
                <Clock size={14} />
                Due: {new Date(selectedAssignment?.dueDate).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <Award size={14} />
                {selectedAssignment?.points} points
              </span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-neutral-700 mb-3">
              Your Submission *
            </label>
            <textarea
              value={submissionText}
              onChange={(e) => setSubmissionText(e.target.value)}
              className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all resize-none"
              rows={8}
              placeholder="Enter your assignment submission here..."
            />
            <p className="text-xs text-neutral-500 mt-2">
              {submissionText.length} characters
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="primary"
              onClick={handleSubmitAssignment}
              disabled={submitting || !submissionText.trim()}
              loading={submitting}
              icon={Upload}
              size="lg"
            >
              Submit Assignment
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setSelectedAssignment(null);
                setSubmissionText('');
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

export default CourseView;