// src/pages/GradingInterface.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ApiService } from '../services/api';
import { Card, Button, Badge, Modal, Input } from '../components/ui';
import { Award, CheckCircle, Clock, AlertCircle, FileText, User } from 'lucide-react';

const GradingInterface = ({ onSelectCourse }) => {
  const { user } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');
  const [grading, setGrading] = useState(false);

  const loadCourseData = async (courseId) => {
    setLoading(true);
    try {
      const courseData = await ApiService.fetchCourseById(courseId);
      setSelectedCourse(courseData);

      const allUsers = JSON.parse(localStorage.getItem('lms_users') || '[]');
      const enrolledStudents = allUsers.filter(
        (u) =>
          u.role === "student" &&
          u.enrolledCourses &&
          u.enrolledCourses.includes(courseId)
      );

      setStudents(enrolledStudents);
    } catch (err) {
      console.error("Failed to load course data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCourse = (courseId) => {
    loadCourseData(courseId);
  };

  const handleGradeSubmission = async () => {
    const gradeValue = parseInt(grade);

    if (!grade || isNaN(gradeValue)) {
      alert("Please enter a valid grade");
      return;
    }

    if (gradeValue > selectedSubmission.maxPoints) {
      alert(`Grade cannot exceed ${selectedSubmission.maxPoints} points`);
      return;
    }

    if (gradeValue < 0) {
      alert("Grade cannot be negative");
      return;
    }

    setGrading(true);
    try {
      await ApiService.gradeAssignment(
        selectedCourse.id,
        selectedSubmission.studentId,
        selectedSubmission.assignmentId,
        gradeValue,
        feedback
      );

      setSelectedSubmission(null);
      setGrade("");
      setFeedback("");

      await loadCourseData(selectedCourse.id);
      alert("Assignment graded successfully!");
    } catch (err) {
      console.error("Grading error:", err);
      alert("Failed to grade assignment: " + err.message);
    } finally {
      setGrading(false);
    }
  };

  // -------------------------
  // FIRST SCREEN: Course List
  // -------------------------
  if (!selectedCourse) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-2">
            Grading Center
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300 text-lg">
            Select a course to review submissions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.managedCourses?.map((courseId) => {
            const allCourses = JSON.parse(localStorage.getItem("lms_courses") || "[]");
            const course = allCourses.find((c) => c.id === courseId);
            if (!course) return null;

            const allUsers = JSON.parse(localStorage.getItem("lms_users") || "[]");

            const pendingCount = course.enrolledStudents.reduce((count, studentId) => {
              const student = allUsers.find((u) => u.id === studentId);
              if (!student) return count;

              const courseAssignments = student.assignments?.[courseId] || {};
              const pendingAssignments = Object.values(courseAssignments).filter(
                (a) => a.submitted && (a.grade === null || a.grade === undefined)
              );
              return count + pendingAssignments.length;
            }, 0);

            return (
              <Card
                key={courseId}
                hover
                className="cursor-pointer group"
                onClick={() => handleSelectCourse(courseId)}
              >
                <div className="h-32 bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl mb-4 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">
                  {course.thumbnail}
                </div>

                <h3 className="font-bold text-xl text-neutral-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                  {course.title}
                </h3>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-300">
                    {course.enrolledStudents.length} students • {course.assignments.length} assignments
                  </span>

                  {pendingCount > 0 && (
                    <Badge variant="warning" size="sm">
                      {pendingCount} pending
                    </Badge>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // -------------------------
  // LOADING SCREEN
  // -------------------------
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600 dark:text-neutral-300 font-medium">
            Loading submissions...
          </p>
        </div>
      </div>
    );
  }

  // -------------------------
  // MAIN GRADING SCREEN
  // -------------------------
  return (
    <div className="space-y-8">

      <div>
        <Button
          variant="ghost"
          onClick={() => setSelectedCourse(null)}
          className="mb-4"
        >
          ← Back to Courses
        </Button>

        <div className="flex items-center gap-4 mb-2">
          <span className="text-5xl">{selectedCourse.thumbnail}</span>
          <div>
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">
              {selectedCourse.title}
            </h1>
            <p className="text-neutral-600 dark:text-neutral-300 text-lg">
              Grade student submissions
            </p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <Card className="bg-gradient-to-br from-primary-50 to-accent-50 border-primary-200">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="text-primary-600" size={20} />
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">
              Total Assignments
            </span>
          </div>
          <p className="text-3xl font-bold text-neutral-900 dark:text-white">
            {selectedCourse.assignments.length}
          </p>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="text-green-600" size={20} />
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">
              Graded
            </span>
          </div>
          <p className="text-3xl font-bold text-neutral-900 dark:text-white">
            {students.reduce((count, s) => {
              const list = s.assignments?.[selectedCourse.id] || {};
              return count + Object.values(list).filter(
                (a) => a.grade !== null && a.grade !== undefined
              ).length;
            }, 0)}
          </p>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="text-amber-600" size={20} />
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">
              Pending
            </span>
          </div>
          <p className="text-3xl font-bold text-neutral-900 dark:text-white">
            {students.reduce((count, s) => {
              const list = s.assignments?.[selectedCourse.id] || {};
              return count + Object.values(list).filter(
                (a) => a.submitted && (a.grade === null || a.grade === undefined)
              ).length;
            }, 0)}
          </p>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-center gap-3 mb-2">
            <User className="text-purple-600" size={20} />
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">
              Students
            </span>
          </div>
          <p className="text-3xl font-bold text-neutral-900 dark:text-white">
            {students.length}
          </p>
        </Card>
      </div>

      {/* ASSIGNMENTS LIST */}
      {selectedCourse.assignments.length === 0 ? (
        <Card className="text-center py-16">
          <FileText size={64} className="mx-auto text-neutral-300 dark:text-neutral-500 mb-4" />
          <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-200 mb-2">
            No assignments yet
          </h3>
          <p className="text-neutral-500 dark:text-neutral-400">
            Create assignments to start grading student work
          </p>
        </Card>
      ) : (
        selectedCourse.assignments.map((assignment) => (
          <Card key={assignment.id}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-3">
                <div className="p-3 bg-primary-100 rounded-xl">
                  <FileText className="text-primary-600" size={24} />
                </div>

                <div>
                  <h3 className="font-bold text-2xl text-neutral-900 dark:text-white mb-1">
                    {assignment.title}
                  </h3>

                  <p className="text-neutral-600 dark:text-neutral-300 mb-2">
                    {assignment.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Award size={14} />
                      {assignment.points} points
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* STUDENT SUBMISSIONS */}
            <div className="space-y-3">
              {students.length === 0 ? (
                <div className="text-center py-8 text-neutral-500 dark:text-neutral-400">
                  No students enrolled yet
                </div>
              ) : (
                students.map((student) => {
                  const submission =
                    student.assignments?.[selectedCourse.id]?.[assignment.id];
                  const isSubmitted = submission?.submitted;
                  const isGraded =
                    submission?.grade !== null &&
                    submission?.grade !== undefined;

                  return (
                    <div
                      key={student.id}
                      className="border-2 border-neutral-200 dark:border-neutral-700 rounded-xl p-5 hover:border-primary-300 transition-colors"
                    >
                      <div className="flex items-center justify-between">

                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              {student.name.charAt(0)}
                            </span>
                          </div>

                          <div>
                            <p className="font-semibold text-neutral-900 dark:text-white">
                              {student.name}
                            </p>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                              {student.email}
                            </p>

                            {submission?.submissionDate && (
                              <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
                                Submitted:{" "}
                                {new Date(submission.submissionDate).toLocaleString()}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {!isSubmitted ? (
                            <Badge variant="warning">Not Submitted</Badge>
                          ) : isGraded ? (
                            <div className="flex items-center gap-3">
                              <Badge variant="success" size="lg">
                                {submission.grade}/{assignment.points}
                              </Badge>
                              {submission.feedback && (
                                <div className="text-xs text-green-600 dark:text-green-400">
                                  ✓ Feedback provided
                                </div>
                              )}
                            </div>
                          ) : (
                            <Button
                              variant="primary"
                              onClick={() => {
                                setSelectedSubmission({
                                  studentId: student.id,
                                  studentName: student.name,
                                  assignmentId: assignment.id,
                                  assignmentTitle: assignment.title,
                                  maxPoints: assignment.points,
                                  submission: submission.content,
                                  submissionDate: submission.submissionDate,
                                });
                              }}
                              icon={Award}
                            >
                              Grade Submission
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </Card>
        ))
      )}

      {/* ------------------ */}
      {/* GRADING MODAL */}
      {/* ------------------ */}
      <Modal
        isOpen={!!selectedSubmission}
        onClose={() => {
          setSelectedSubmission(null);
          setGrade("");
          setFeedback("");
        }}
        title="Grade Submission"
      >
        <div>
          {/* Student & Assignment Info */}
          <div className="mb-6 p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl border border-primary-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {selectedSubmission?.studentName.charAt(0)}
                </span>
              </div>

              <div>
                <p className="font-bold text-neutral-900 dark:text-white">
                  {selectedSubmission?.studentName}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  {selectedSubmission?.assignmentTitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-300">
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {selectedSubmission?.submissionDate &&
                  new Date(selectedSubmission.submissionDate).toLocaleString()}
              </span>

              <span className="flex items-center gap-1">
                <Award size={14} />
                Max: {selectedSubmission?.maxPoints} points
              </span>
            </div>
          </div>

          {/* Submission Content */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-200 mb-3">
              Student Submission
            </label>

            <div className="p-4 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl max-h-60 overflow-y-auto">
              <p className="text-neutral-800 dark:text-neutral-100 whitespace-pre-wrap leading-relaxed">
                {selectedSubmission?.submission ||
                  "No submission content available"}
              </p>
            </div>
          </div>

          {/* Grading Form */}
          <div className="space-y-5">
            <Input
              label={`Grade (out of ${selectedSubmission?.maxPoints} points)`}
              type="number"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              placeholder="Enter grade"
              min="0"
              max={selectedSubmission?.maxPoints}
            />

            <div>
              <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-200 mb-2">
                Feedback (Optional)
              </label>

              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full px-4 py-3 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100 transition-all resize-none dark:bg-neutral-800 dark:text-neutral-100"
                rows={5}
                placeholder="Provide constructive feedback…"
              />

              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                {feedback.length} characters
              </p>
            </div>

            {/* Quick Feedback Templates */}
            <div>
              <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-200 mb-2">
                Quick Feedback Templates
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  "Excellent work! Well done.",
                  "Good effort, but needs improvement in clarity.",
                  "Please review the concepts and resubmit.",
                  "Outstanding analysis and presentation!",
                ].map((template, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFeedback(template)}
                    className="px-3 py-1.5 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-neutral-700 transition-colors"
                  >
                    {template}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
            <Button
              variant="success"
              onClick={handleGradeSubmission}
              disabled={grading || !grade}
              loading={grading}
              icon={CheckCircle}
              size="lg"
            >
              Submit Grade
            </Button>

            <Button
              variant="secondary"
              onClick={() => {
                setSelectedSubmission(null);
                setGrade("");
                setFeedback("");
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

export default GradingInterface;
