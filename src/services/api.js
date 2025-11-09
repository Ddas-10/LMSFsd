// src/services/api.js
import { MOCK_USERS, MOCK_COURSES } from '../data/mockData';

export class ApiService {
  static delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  static async login(username, password) {
    await this.delay(500);
    const user = MOCK_USERS.find(u => u.username === username && u.password === password);
    if (!user) throw new Error('Invalid credentials');
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static async fetchCourses() {
    await this.delay(300);
    return [...MOCK_COURSES];
  }

  static async fetchCourseById(courseId) {
    await this.delay(400);
    const course = MOCK_COURSES.find(c => c.id === courseId);
    if (!course) throw new Error('Course not found');
    return { ...course };
  }

  static async enrollInCourse(userId, courseId) {
    await this.delay(600);
    const user = MOCK_USERS.find(u => u.id === userId);
    const course = MOCK_COURSES.find(c => c.id === courseId);
    
    if (user && course && user.role === 'student') {
      if (!user.enrolledCourses.includes(courseId)) {
        user.enrolledCourses.push(courseId);
        user.progress[courseId] = 0;
        course.enrolledStudents.push(userId);
      }
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    throw new Error('Enrollment failed');
  }

  static async updateProgress(userId, courseId, progress) {
    await this.delay(500);
    const user = MOCK_USERS.find(u => u.id === userId);
    if (user) {
      user.progress[courseId] = Math.min(100, progress);
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    throw new Error('Update failed');
  }

  static async submitAssignment(userId, courseId, assignmentId, submission) {
    await this.delay(700);
    const user = MOCK_USERS.find(u => u.id === userId);
    if (user) {
      if (!user.assignments[courseId]) user.assignments[courseId] = {};
      user.assignments[courseId][assignmentId] = {
        submitted: true,
        submissionDate: new Date().toISOString(),
        content: submission,
        grade: null,
        feedback: null
      };
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    throw new Error('Submission failed');
  }

  static async gradeAssignment(courseId, studentId, assignmentId, grade, feedback) {
    await this.delay(500);
    const student = MOCK_USERS.find(u => u.id === studentId);
    if (student && student.assignments[courseId] && student.assignments[courseId][assignmentId]) {
      student.assignments[courseId][assignmentId] = {
        ...student.assignments[courseId][assignmentId],
        grade,
        feedback,
        gradedDate: new Date().toISOString()
      };
      return true;
    }
    throw new Error('Grading failed');
  }

  static async createCourse(courseData) {
    await this.delay(600);
    const newCourse = {
      ...courseData,
      id: MOCK_COURSES.length + 1,
      modules: [],
      assignments: [],
      quizzes: [],
      enrolledStudents: []
    };
    MOCK_COURSES.push(newCourse);
    return newCourse;
  }

  static async updateCourse(courseId, updates) {
    await this.delay(500);
    const courseIndex = MOCK_COURSES.findIndex(c => c.id === courseId);
    if (courseIndex !== -1) {
      MOCK_COURSES[courseIndex] = { ...MOCK_COURSES[courseIndex], ...updates };
      return MOCK_COURSES[courseIndex];
    }
    throw new Error('Course not found');
  }

  static async deleteCourse(courseId) {
    await this.delay(500);
    const index = MOCK_COURSES.findIndex(c => c.id === courseId);
    if (index !== -1) {
      MOCK_COURSES.splice(index, 1);
      return true;
    }
    throw new Error('Course not found');
  }
}