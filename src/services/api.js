// src/services/api.js
import { MOCK_USERS, MOCK_COURSES } from '../data/mockData';

// Helper to get data from localStorage
const getStorageData = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

// Helper to set data in localStorage
const setStorageData = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
  }
};

// Initialize storage with mock data
const initStorage = () => {
  if (!localStorage.getItem('lms_users')) {
    setStorageData('lms_users', MOCK_USERS);
  }
  if (!localStorage.getItem('lms_courses')) {
    setStorageData('lms_courses', MOCK_COURSES);
  }
};

export class ApiService {
  static delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  static async login(username, password) {
    initStorage();
    await this.delay(500);
    
    const users = getStorageData('lms_users', []);
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static async fetchCourses() {
    initStorage();
    await this.delay(300);
    return getStorageData('lms_courses', []);
  }

  static async fetchCourseById(courseId) {
    initStorage();
    await this.delay(400);
    
    const courses = getStorageData('lms_courses', []);
    const course = courses.find(c => c.id === courseId);
    
    if (!course) {
      throw new Error('Course not found');
    }
    
    return course;
  }

  static async enrollInCourse(userId, courseId) {
    initStorage();
    await this.delay(600);
    
    const users = getStorageData('lms_users', []);
    const courses = getStorageData('lms_courses', []);
    
    const user = users.find(u => u.id === userId);
    const course = courses.find(c => c.id === courseId);
    
    if (!user || !course) {
      throw new Error('User or course not found');
    }
    
    if (user.role !== 'student') {
      throw new Error('Only students can enroll in courses');
    }
    
    // Initialize arrays if they don't exist
    if (!user.enrolledCourses) user.enrolledCourses = [];
    if (!user.progress) user.progress = {};
    if (!course.enrolledStudents) course.enrolledStudents = [];
    
    // Enroll if not already enrolled
    if (!user.enrolledCourses.includes(courseId)) {
      user.enrolledCourses.push(courseId);
      user.progress[courseId] = 0;
    }
    
    if (!course.enrolledStudents.includes(userId)) {
      course.enrolledStudents.push(userId);
    }
    
    // Save back to storage
    setStorageData('lms_users', users);
    setStorageData('lms_courses', courses);
    
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static async updateProgress(userId, courseId, progress) {
    initStorage();
    await this.delay(500);
    
    const users = getStorageData('lms_users', []);
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    if (!user.progress) user.progress = {};
    user.progress[courseId] = Math.min(100, Math.max(0, progress));
    
    setStorageData('lms_users', users);
    
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static async submitAssignment(userId, courseId, assignmentId, submission) {
    initStorage();
    await this.delay(700);
    
    const users = getStorageData('lms_users', []);
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    if (!user.assignments) user.assignments = {};
    if (!user.assignments[courseId]) user.assignments[courseId] = {};
    
    user.assignments[courseId][assignmentId] = {
      submitted: true,
      submissionDate: new Date().toISOString(),
      content: submission,
      grade: null,
      feedback: null
    };
    
    setStorageData('lms_users', users);
    
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static async gradeAssignment(courseId, studentId, assignmentId, grade, feedback) {
    initStorage();
    await this.delay(500);
    
    const users = getStorageData('lms_users', []);
    const student = users.find(u => u.id === studentId);
    
    if (!student) {
      throw new Error('Student not found');
    }
    
    if (!student.assignments || 
        !student.assignments[courseId] || 
        !student.assignments[courseId][assignmentId]) {
      throw new Error('Assignment submission not found');
    }
    
    student.assignments[courseId][assignmentId] = {
      ...student.assignments[courseId][assignmentId],
      grade: parseInt(grade),
      feedback: feedback || '',
      gradedDate: new Date().toISOString()
    };
    
    setStorageData('lms_users', users);
    return true;
  }

  static async createCourse(courseData) {
    initStorage();
    await this.delay(600);
    
    const courses = getStorageData('lms_courses', []);
    const maxId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) : 0;
    
    const newCourse = {
      ...courseData,
      id: maxId + 1,
      modules: courseData.modules || [],
      assignments: courseData.assignments || [],
      quizzes: courseData.quizzes || [],
      enrolledStudents: []
    };
    
    courses.push(newCourse);
    setStorageData('lms_courses', courses);
    
    return newCourse;
  }

  static async deleteCourse(courseId) {
    initStorage();
    await this.delay(500);
    
    const courses = getStorageData('lms_courses', []);
    const filteredCourses = courses.filter(c => c.id !== courseId);
    
    if (courses.length === filteredCourses.length) {
      throw new Error('Course not found');
    }
    
    setStorageData('lms_courses', filteredCourses);
    return true;
  }

  static async getCurrentUser(userId) {
    initStorage();
    const users = getStorageData('lms_users', []);
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static getUsers() {
    initStorage();
    return getStorageData('lms_users', []);
  }
}