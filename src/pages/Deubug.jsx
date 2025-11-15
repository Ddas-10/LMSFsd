// src/pages/DebugPage.jsx
import React from 'react';
import { Card, Button } from '../components/ui';
import { MOCK_USERS, MOCK_COURSES } from '../data/mockData';

const DebugPage = () => {
  const users = JSON.parse(localStorage.getItem('lms_users') || '[]');
  const courses = JSON.parse(localStorage.getItem('lms_courses') || '[]');

  const resetData = () => {
    localStorage.removeItem('lms_users');
    localStorage.removeItem('lms_courses');
    localStorage.removeItem('lms_current_user');
    window.location.reload();
  };

  const initData = () => {
    localStorage.setItem('lms_users', JSON.stringify(MOCK_USERS));
    localStorage.setItem('lms_courses', JSON.stringify(MOCK_COURSES));
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
          Debug Information
        </h2>

        <div className="space-y-4">
          {/* USERS */}
          <div>
            <h3 className="font-bold text-neutral-800 dark:text-neutral-200 mb-2">
              Users in Storage:
            </h3>

            <pre className="bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-100 p-4 rounded overflow-auto text-xs">
              {JSON.stringify(users, null, 2)}
            </pre>
          </div>

          {/* COURSES */}
          <div>
            <h3 className="font-bold text-neutral-800 dark:text-neutral-200 mb-2">
              Courses in Storage:
            </h3>

            <pre className="bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-100 p-4 rounded overflow-auto text-xs">
              {JSON.stringify(courses, null, 2)}
            </pre>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3">
            <Button variant="danger" onClick={resetData}>
              Reset All Data
            </Button>

            <Button variant="primary" onClick={initData}>
              Initialize Data
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DebugPage;
