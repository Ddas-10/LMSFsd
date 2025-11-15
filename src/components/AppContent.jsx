import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  LayoutDashboard, BookOpen, GraduationCap, FileText,
  LogOut, Menu, X, Bell, Settings, User, ChevronDown,
  Target, Award, TrendingUp, Sun, Moon
} from 'lucide-react';
import { Button } from './ui';
import LoginPage from '../pages/LoginPage';
import StudentDashboard from '../pages/StudentDashboard';
import TeacherDashboard from '../pages/TeacherDashboard';
import CourseCatalog from '../pages/CourseCatalog';
import MyCourses from '../pages/MyCourses';
import CourseView from '../pages/CourseView';
import CourseManagement from '../pages/CourseManagement';
import GradingInterface from '../pages/GradingInterface';

const AppContent = () => {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    signOut();
    setCurrentView('dashboard');
    setSelectedCourseId(null);
  };

  if (!user) {
    return <LoginPage onLoginSuccess={() => setCurrentView('dashboard')} />;
  }

  const navigation = user.role === 'student' ? [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'catalog', label: 'Explore Courses', icon: BookOpen },
    { id: 'mycourses', label: 'My Learning', icon: GraduationCap }
  ] : [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'manage', label: 'My Courses', icon: BookOpen },
    { id: 'grading', label: 'Grade Students', icon: FileText }
  ];

  // Mock study stats for student
  const studentStats = user.role === 'student' ? {
    streak: 7,
    totalHours: 24,
    completedCourses: 3
  } : null;

  return (
    <div className="min-h-screen bg-light-primary dark:bg-dark-primary relative transition-colors duration-300">
      {/* Animated background pattern */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-light-accent-primary dark:bg-dark-accent-primary rounded-full mix-blend-multiply filter blur-3xl animate-float opacity-30 dark:opacity-20" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-light-accent-secondary dark:bg-dark-accent-secondary rounded-full mix-blend-multiply filter blur-3xl animate-float-delayed opacity-30 dark:opacity-20" />
        <div className="absolute top-40 right-40 w-72 h-72 bg-light-accent-primary dark:bg-dark-accent-primary rounded-full mix-blend-multiply filter blur-3xl animate-float opacity-30 dark:opacity-20" />
      </div>

      {/* Top Navigation Bar */}
      <nav className="glass sticky top-0 z-50 shadow-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-light-accent-primary to-light-accent-secondary dark:from-dark-accent-primary dark:to-dark-accent-secondary rounded-2xl flex items-center justify-center shadow-xl transform rotate-6 hover:rotate-0 transition-transform duration-300">
                    <GraduationCap size={28} className="text-white -rotate-6 hover:rotate-0 transition-transform duration-300" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-light-card dark:border-dark-card shadow-lg animate-pulse-soft" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
                    <span className="bg-gradient-to-r from-light-accent-primary to-light-accent-secondary dark:from-dark-accent-primary dark:to-dark-accent-secondary bg-clip-text text-transparent font-bold">EduTrack</span>
                  </h1>
                  <p className="text-xs font-medium text-black">
                    Master Your Learning Journey
                  </p>

                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navigation.map(nav => (
                <button
                  key={nav.id}
                  onClick={() => {
                    setCurrentView(nav.id);
                    setSelectedCourseId(null);
                  }}
                  className={`
        flex items-center gap-2 px-5 py-2.5 rounded-xl
        font-semibold text-sm transition-all duration-300
        ${currentView === nav.id
                      ? 'bg-gradient-to-r from-light-accent-primary to-light-accent-secondary dark:from-dark-accent-primary dark:to-dark-accent-secondary text-black shadow-lg transform scale-105'
                      : 'text-light-text-primary hover:bg-light-card/60 text-black dark:hover:bg-dark-card/60'
                    }
      `}
                >
                  {nav.label}
                </button>
              ))}
            </div>


            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Student Study Stats (Desktop) */}
              {studentStats && (
                <div className="hidden lg:flex items-center gap-3 mr-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
                    <Award size={16} />
                    <span className="text-sm font-bold">{studentStats.streak} day streak</span>
                  </div>
                </div>
              )}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="hidden md:flex p-2.5 hover:bg-light-card/60 dark:hover:bg-dark-card/60 rounded-xl transition-all relative group"
                title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              >
                {isDark ? (
                  <Sun size={20} className="text-light-text-primary group-hover:text-dark-accent-primary transition-colors" />
                ) : (
                  <Moon size={20} className="text-light-text-primary group-hover:text-dark-accent-primary transition-colors" />
                )}
              </button>

              {/* Notifications */}
              <button className="hidden md:flex p-2.5 hover:bg-light-card/60 dark:hover:bg-dark-card/60 rounded-xl transition-all relative group">
                <Bell size={20} className="text-light-text-primary group-hover:text-dark-accent-primary transition-colors" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="hidden md:flex items-center gap-3 px-4 py-2 hover:bg-light-card/60 dark:hover:bg-dark-card/60 rounded-xl transition-all"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-light-accent-primary to-light-accent-secondary dark:from-dark-accent-primary dark:to-dark-accent-secondary rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-black">{user.name.split(' ')[0]}</p>
                    <p className="text-xs font-medium text-black capitalize">{user.role}</p>
                  </div>
                  <ChevronDown size={16} className="text-light-text-secondary dark:text-dark-text-secondary" />
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 glass rounded-2xl shadow-2xl border border-white/20 py-2 animate-slide-in-bottom">
                    <div className="px-4 py-3 border-b border-light-border dark:border-dark-border">
                      <p className="font-bold text-black">{user.name}</p>
                      <p className="text-sm text-black">{user.email}</p>
                      {studentStats && (
                        <div className="flex gap-2 mt-2">
                          <span className="text-xs font-semibold text-light-accent-primary bg-light-accent-primary/10 dark:text-dark-accent-primary dark:bg-dark-accent-primary/10 px-2 py-1 rounded-lg">
                            {studentStats.totalHours}h studied
                          </span>
                          <span className="text-xs font-semibold text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-300 px-2 py-1 rounded-lg">
                            {studentStats.completedCourses} completed
                          </span>
                        </div>
                      )}
                    </div>
                    <button className="w-full px-4 py-2.5 text-left hover:bg-light-card/50 dark:hover:bg-dark-card/50 flex items-center gap-3 text-light-text-primary dark:text-dark-text-primary transition-colors">
                      <User size={18} className='text-black' />
                      <span className="text-sm font-medium text-black">View Profile</span>
                    </button>
                    <button className="w-full px-4 py-2.5 text-left hover:bg-light-card/50 dark:hover:bg-dark-card/50 flex items-center gap-3 text-light-text-primary dark:text-dark-text-primary transition-colors">
                      <Settings size={18} className='text-black' />
                      <span className="text-sm font-medium text-black">Settings</span>
                    </button>
                    <div className="border-t border-light-border dark:border-dark-border mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2.5 text-left hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 text-red-600 dark:text-red-300 transition-colors rounded-lg mx-2 w-[calc(100%-1rem)]"
                      >
                        <LogOut size={18} className='text-red-600' />
                        <span className="text-sm font-bold text-red-600">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2.5 hover:bg-light-card/60 dark:hover:bg-dark-card/60 rounded-xl transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} className="text-light-text-primary dark:text-dark-text-primary" /> : <Menu size={24} className="text-light-text-primary dark:text-dark-text-primary" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/20 animate-slide-in-bottom">
              {/* Mobile Study Stats */}
              {studentStats && (
                <div className="mb-4 p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award size={20} className="text-dark-accent-primary" />
                      <span className="text-sm font-bold text-light-text-primary dark:text-dark-text-primary">{studentStats.streak} day streak</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-xs font-semibold text-light-accent-primary bg-light-accent-primary/10 dark:text-dark-accent-primary dark:bg-dark-accent-primary/10 px-2 py-1 rounded-lg">
                        {studentStats.totalHours}h
                      </span>
                      <span className="text-xs font-semibold text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-300 px-2 py-1 rounded-lg">
                        {studentStats.completedCourses} done
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {navigation.map(nav => (
                  <button
                    key={nav.id}
                    onClick={() => {
                      setCurrentView(nav.id);
                      setSelectedCourseId(null);
                      setMobileMenuOpen(false);
                    }}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3.5 rounded-xl
                      font-semibold text-sm transition-all
                      ${currentView === nav.id
                        ? 'bg-gradient-to-r from-light-accent-primary to-light-accent-secondary dark:from-dark-accent-primary dark:to-dark-accent-secondary text-white shadow-lg'
                        : 'text-light-text-primary hover:bg-light-card/60 dark:text-dark-text-primary dark:hover:bg-dark-card/60'
                      }
                    `}
                  >
                    <nav.icon size={20} />
                    {nav.label}
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:text-red-300 font-semibold text-sm transition-all"
                >
                  <LogOut size={20} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 custom-scrollbar">
        <div className="animate-slide-in-bottom">
          {user.role === 'student' && (
            <>
              {currentView === 'dashboard' && <StudentDashboard />}
              {currentView === 'catalog' && <CourseCatalog />}
              {currentView === 'mycourses' && !selectedCourseId && (
                <MyCourses onSelectCourse={(id) => {
                  setSelectedCourseId(id);
                  setCurrentView('courseview');
                }} />
              )}
              {currentView === 'courseview' && selectedCourseId && (
                <div>
                  <Button
                    variant="glass"
                    onClick={() => {
                      setCurrentView('mycourses');
                      setSelectedCourseId(null);
                    }}
                    className="mb-6"
                  >
                    ← Back to My Courses
                  </Button>
                  <CourseView courseId={selectedCourseId} />
                </div>
              )}
            </>
          )}

          {user.role === 'teacher' && (
            <>
              {currentView === 'dashboard' && <TeacherDashboard />}
              {currentView === 'manage' && <CourseManagement />}
              {currentView === 'grading' && !selectedCourseId && (
                <GradingInterface onSelectCourse={setSelectedCourseId} />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AppContent;
