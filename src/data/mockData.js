// src/data/mockData.js
export const MOCK_USERS = [
  {
    id: 1,
    username: 'student1',
    password: 'pass123',
    role: 'student',
    name: 'Dhrupad Das',
    email: 'dhrudas@example.com',
    enrolledCourses: [1, 2],
    progress: { 1: 65, 2: 30 },
    assignments: {
      1: { 1: { submitted: true, grade: 85, feedback: 'Great work!' } },
      2: { 1: { submitted: false, grade: null } }
    },
    quizScores: { 1: [90, 85, 88], 2: [75] }
  },
  {
    id: 2,
    username: 'student2',
    password: 'pass123',
    role: 'student',
    name: 'Ishan Pandey',
    email: 'Ishpandey@example.com',
    enrolledCourses: [1],
    progress: { 1: 40 },
    assignments: { 1: { 1: { submitted: true, grade: 78 } } },
    quizScores: { 1: [82, 79] }
  },
  {
    id: 3,
    username: 'teacher1',
    password: 'pass123',
    role: 'teacher',
    name: 'Dr. Manjunath',
    email: 'Manjunath@example.com',
    managedCourses: [1, 2, 3]
  }
];

export const MOCK_COURSES = [
  {
    id: 1,
    title: 'Full Stack Web Dev',
    description: 'Master Web dev fundamentals and build modern web applications.',
    instructor: 'Dr. Chirag Mittal',
    duration: '8 weeks',
    level: 'Beginner',
    thumbnail: '⚛️',
    modules: [
      { 
        id: 1, 
        title: 'Components & Props', 
        content: 'Learn about React components, props, and composition.',
        duration: '2 hours'
      },
      { 
        id: 2, 
        title: 'State & Lifecycle', 
        content: 'Understanding state management and component lifecycle.',
        duration: '2.5 hours'
      },
      { 
        id: 3, 
        title: 'Hooks in Depth', 
        content: 'Deep dive into React Hooks and custom hooks.',
        duration: '3 hours'
      }
    ],
    assignments: [
      { 
        id: 1, 
        title: 'Build a Todo App', 
        description: 'Create a functional todo application.',
        dueDate: '2025-11-10',
        points: 100
      },
      { 
        id: 2, 
        title: 'Component Library', 
        description: 'Design a reusable component library.',
        dueDate: '2025-11-25',
        points: 150
      }
    ],
    quizzes: [
      { id: 1, title: 'React Basics Quiz', questions: 10, duration: '15 min' }
    ],
    enrolledStudents: [1, 2]
  },
  {
    id: 2,
    title: 'ML',
    description: 'Deep dive into modern ML concepts.',
    instructor: 'Dr. Siddharth',
    duration: '10 weeks',
    level: 'Advanced',
    thumbnail: '🚀',
    modules: [
      { 
        id: 1, 
        title: 'Data Cleaning', 
        content: 'Master pandas and maltplotlib',
        duration: '2 hours'
      },
      { 
        id: 2, 
        title: 'Linear Regression', 
        content: 'Linear Algebra gradient descent and all',
        duration: '3 hours'
      }
    ],
    assignments: [
      { 
        id: 1, 
        title: 'LR Implementation', 
        description: 'Build custom LR on real world dataset from scratch.',
        dueDate: '2025-11-20',
        points: 120
      }
    ],
    quizzes: [],
    enrolledStudents: [1]
  },
  {
    id: 3,
    title: 'Full-Stack Development',
    description: 'Build complete applications from frontend to backend.',
    instructor: 'Dr. Manjunath',
    duration: '12 weeks',
    level: 'Intermediate',
    thumbnail: '💻',
    modules: [
      { 
        id: 1, 
        title: 'RESTful APIs', 
        content: 'Design and implement REST APIs.',
        duration: '3 hours'
      }
    ],
    assignments: [],
    quizzes: [],
    enrolledStudents: []
  }
];
