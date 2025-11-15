import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, Button, Input, Alert } from '../components/ui';
import { Mail, Lock, GraduationCap, BookOpen, Users, Award, Sparkles, TrendingUp, Zap } from 'lucide-react';

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
    { icon: Sparkles, title: 'Interactive Courses', desc: 'Engage with rich multimedia content', color: 'from-purple-400 to-pink-400' },
    { icon: TrendingUp, title: 'Collaborative Learning', desc: 'Connect with peers and instructors', color: 'from-blue-400 to-cyan-400' },
    { icon: Zap, title: 'Track Progress', desc: 'Monitor your learning journey', color: 'from-amber-400 to-orange-400' }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden flex">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '4s'}}></div>
        </div>
      </div>

      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10 p-12">
        <div className="flex flex-col justify-between w-full">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-16 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative p-3 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl shadow-xl">
                  <GraduationCap size={36} className="text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">EduLearn</h1>
                <p className="text-sm text-neutral-500 font-medium">Learning Reimagined</p>
              </div>
            </div>
            
            {/* Main Heading */}
            <div className="mb-12">
              <h2 className="text-5xl font-bold mb-4 leading-tight bg-gradient-to-br from-neutral-900 via-neutral-700 to-neutral-600 bg-clip-text text-transparent">
                Transform Your<br />Learning Experience
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed max-w-md">
                Join thousands of learners worldwide. Access premium courses, track your progress, and achieve your goals.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, idx) => (
                <div key={idx} className="group flex items-start gap-4 p-5 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/50 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                  <div className={`p-3 bg-gradient-to-br ${feature.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform`}>
                    <feature.icon size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-800 mb-1">{feature.title}</h3>
                    <p className="text-sm text-neutral-600">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Stats */}
          <div className="flex gap-8 pt-8 border-t border-neutral-200/50">
            <div>
              <div className="text-3xl font-bold text-neutral-800">10K+</div>
              <div className="text-sm text-neutral-500">Active Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-neutral-800">500+</div>
              <div className="text-sm text-neutral-500">Courses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-neutral-800">98%</div>
              <div className="text-sm text-neutral-500">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="p-2.5 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl shadow-lg">
              <GraduationCap size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-800">EduLearn</h1>
          </div>

          <Card className="shadow-2xl border border-white/20 backdrop-blur-2xl bg-white/70" padding="lg">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl mb-4 shadow-lg relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <GraduationCap size={28} className="text-white relative z-10" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-2">Welcome Back</h2>
              <p className="text-neutral-500 text-sm">Sign in to continue your learning journey</p>
            </div>

            {error && (
              <Alert variant="danger" className="mb-6">
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
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
                className="mt-6"
              >
                Sign In
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 p-4 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 backdrop-blur-sm rounded-xl border border-blue-100/50">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                <p className="text-xs font-bold text-neutral-600 uppercase tracking-wide">Demo Accounts</p>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-white/80 backdrop-blur-sm rounded-lg border border-white/50 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-neutral-600 font-medium"> Student</span>
                  <code className="text-blue-600 font-mono font-semibold">student1 / pass123</code>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-white/80 backdrop-blur-sm rounded-lg border border-white/50 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-neutral-600 font-medium"> Teacher</span>
                  <code className="text-blue-600 font-mono font-semibold">teacher1 / pass123</code>
                </div>
              </div>
            </div>
          </Card>

          {/* Footer */}
          <p className="text-center text-xs text-neutral-400 mt-6">
            © 2025 EduLearn. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;