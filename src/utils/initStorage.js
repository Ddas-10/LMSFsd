// src/utils/initStorage.js
import { MOCK_USERS, MOCK_COURSES } from '../data/mockData';

export const initializeStorage = () => {
  console.log('🔧 Initializing storage...');
  
  // Check if data exists
  const existingUsers = localStorage.getItem('lms_users');
  const existingCourses = localStorage.getItem('lms_courses');
  
  // Initialize users
  if (!existingUsers) {
    console.log('📝 Setting up users...');
    localStorage.setItem('lms_users', JSON.stringify(MOCK_USERS));
  }
  
  // Initialize courses
  if (!existingCourses) {
    console.log('📚 Setting up courses...');
    localStorage.setItem('lms_courses', JSON.stringify(MOCK_COURSES));
  }
  
  // Verify
  const users = JSON.parse(localStorage.getItem('lms_users') || '[]');
  const courses = JSON.parse(localStorage.getItem('lms_courses') || '[]');
  
  console.log('✅ Storage initialized:', {
    users: users.length,
    courses: courses.length
  });
};

export const resetStorage = () => {
  console.log('🗑️ Resetting storage...');
  localStorage.removeItem('lms_users');
  localStorage.removeItem('lms_courses');
  localStorage.removeItem('lms_current_user');
  initializeStorage();
  console.log('✅ Storage reset complete');
};