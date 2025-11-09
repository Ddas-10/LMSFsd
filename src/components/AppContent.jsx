import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, BookOpen, GraduationCap, FileText, 
  LogOut, Menu, X, Bell, Settings, User, ChevronDown 
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
    { id: 'catalog', label: 'Explore', icon: BookOpen },
    { id: 'mycourses', label: 'My Learning', icon: GraduationCap }
  ] : [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'manage', label: 'Courses', icon: BookOpen },
    { id: 'grading', label: 'Grading', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-neutral-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <GraduationCap size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gradient">EduLearn</h1>
                  <p className="text-xs text-neutral-500 hidden sm:block">Learning Portal</p>
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
                    flex items-center gap-2 px-4 py-2 rounded-xl 
                    font-semibold text-sm transition-all duration-200
                    ${currentView === nav.id
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                      : 'text-neutral-700 hover:bg-neutral-100'
                    }
                  `}
                >
                  <nav.icon size={18} />
                  <span>{nav.label}</span>
                </button>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              <button className="hidden md:block p-2 hover:bg-neutral-100 rounded-xl transition-colors relative">
                <Bell size={20} className="text-neutral-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="hidden md:flex items-center gap-2 px-3 py-2 hover:bg-neutral-100 rounded-xl transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-neutral-900">{user.name.split(' ')[0]}</p>
                    <p className="text-xs text-neutral-500 capitalize">{user.role}</p>
                  </div>
                  <ChevronDown size={16} className="text-neutral-400" />
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-neutral-200 py-2">
                    <div className="px-4 py-3 border-b border-neutral-100">
                      <p className="font-semibold text-neutral-900">{user.name}</p>
                      <p className="text-sm text-neutral-500">{user.email}</p>
                    </div>
                    <button className="w-full px-4 py-2 text-left hover:bg-neutral-50 flex items-center gap-2 text-neutral-700">
                      <User size={16} />
                      <span className="text-sm">Profile</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left hover:bg-neutral-50 flex items-center gap-2 text-neutral-700">
                      <Settings size={16} />
                      <span className="text-sm">Settings</span>
                    </button>
                    <div className="border-t border-neutral-100 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center gap-2 text-red-600"
                      >
                        <LogOut size={16} />
                        <span className="text-sm font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 hover:bg-neutral-100 rounded-xl"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-neutral-200">
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
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl 
                      font-semibold text-sm transition-all
                      ${currentView === nav.id
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                        : 'text-neutral-700 hover:bg-neutral-100'
                      }
                    `}
                  >
                    <nav.icon size={20} />
                    {nav.label}
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 font-semibold text-sm"
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                  variant="ghost"
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
      </main>
    </div>
  );
};

export default AppContent;