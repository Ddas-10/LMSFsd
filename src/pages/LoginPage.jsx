import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, Button, Input, Alert } from '../components/ui';
import { Mail, Lock, GraduationCap, BookOpen, Users, Award } from 'lucide-react';

const LoginPage = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, loading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(username, password);
      onLoginSuccess();
    } catch (err) {
      // Error handled by context
    }
  };

  const features = [
    { icon: BookOpen, title: 'Interactive Courses', desc: 'Engage with rich multimedia content' },
    { icon: Users, title: 'Collaborative Learning', desc: 'Connect with peers and instructors' },
    { icon: Award, title: 'Track Progress', desc: 'Monitor your learning journey' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-900 flex">
      
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"></div>
        
        <div className="relative z-10 flex flex-col justify-between w-full">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                <GraduationCap size={40} />
              </div>
              <div>
                <h1 className="text-4xl font-bold">EduLearn</h1>
                <p className="text-blue-100">Learning Management System</p>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold mb-4 leading-tight">
              Transform Your<br />Learning Experience
            </h2>
            <p className="text-xl text-blue-100 mb-12">
              Access world-class courses, track your progress, and achieve your educational goals.
            </p>

            <div className="space-y-6">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <feature.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-blue-100 text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-sm text-blue-100">
            © 2025 EduLearn. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl border-0" padding="lg">
            
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4">
                <GraduationCap size={32} className="text-white" />
              </div>

              <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">Welcome Back</h2>
              <p className="text-neutral-600 dark:text-neutral-300">
                Sign in to continue your learning journey
              </p>
            </div>

            {error && (
              <Alert variant="danger" className="mb-6">
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter your username"
                icon={Mail}
              />

              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                icon={Lock}
              />

              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                loading={loading}
                fullWidth
                size="lg"
              >
                Sign In
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-neutral-800 dark:to-neutral-700 rounded-xl border border-blue-100 dark:border-neutral-700">
              <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-200 mb-3">
                Demo Credentials
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-white dark:bg-neutral-800 rounded-lg">
                  <span className="text-neutral-600 dark:text-neutral-300">Student</span>
                  <code className="text-blue-600 dark:text-blue-400 font-mono">student1 / pass123</code>
                </div>

                <div className="flex items-center justify-between p-2 bg-white dark:bg-neutral-800 rounded-lg">
                  <span className="text-neutral-600 dark:text-neutral-300">Teacher</span>
                  <code className="text-blue-600 dark:text-blue-400 font-mono">teacher1 / pass123</code>
                </div>
              </div>
            </div>

          </Card>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;
