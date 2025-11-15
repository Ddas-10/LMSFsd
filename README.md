# EduTrack LMS

A modern, responsive Learning Management System (LMS) built with React, designed to streamline educational experiences for both students and teachers. Features a beautiful dark/light mode toggle with a sophisticated Nocturne Black dark theme.

## 🌟 Features

### For Students
- **Interactive Dashboard**: Track learning progress, streaks, and achievements
- **Course Catalog**: Browse and enroll in available courses
- **My Learning**: Manage enrolled courses and track completion
- **Course Viewer**: Access course materials and content
- **Study Analytics**: Monitor study hours and performance metrics

### For Teachers
- **Dashboard Overview**: Manage courses and student progress
- **Course Management**: Create and organize course content
- **Grading Interface**: Evaluate student submissions and assignments
- **Student Analytics**: Track class performance and engagement

### Core Features
- **Dual Role System**: Separate interfaces for students and teachers
- **Dark/Light Mode**: Seamless theme switching with custom color palettes
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Glass morphism effects, smooth animations, and professional design
- **Authentication**: Secure login system with role-based access
- **Real-time Updates**: Dynamic content loading and state management

## 🎨 Design System

### Light Mode (Warm Elegance)
- Primary Background: `#F5F3EF`
- Card Background: `#FFFFFF`
- Accent Colors: Indigo/Purple gradients
- Text: Dark grays for optimal readability

### Dark Mode (Nocturne Black)
- Primary Background: `#1C1B22`
- Card Background: `#23222A`
- Section Background: `#1A1A21`
- Accent Primary: `#8B7FD0` (Velvet Indigo)
- Accent Secondary: `#A499D9` (Soft Amethyst)
- Accent Hover: `#B3A8F2` (Lavender Glow)
- Text Primary: `#E8E6EB` (Pearl Mist)
- Text Secondary: `#A1A0A8` (Silver Fog)
- Border: `#2E2D36` (Shadow Line)

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.2.0
- **Build Tool**: Vite 7.1.12
- **Styling**: Tailwind CSS 3.4.0
- **Icons**: Lucide React 0.263.1
- **State Management**: React Context API
- **Development**: PostCSS, Autoprefixer

## 📁 Project Structure & File Details

```
LMSFsd/
├── .gitignore                    # Git ignore rules for build artifacts
├── index.html                    # Main HTML entry point with meta tags
├── package.json                  # NPM dependencies and scripts
├── vite.config.js                # Vite build configuration
├── tailwind.config.js            # Tailwind CSS configuration with custom colors
├── postcss.config.js             # PostCSS configuration for Tailwind
├── TODO.md                       # Development task tracking
├── README.md                     # Project documentation (this file)
├── src/
│   ├── main.jsx                  # React app entry point, renders App component
│   ├── App.jsx                   # Root component with providers and loading state
│   ├── index.css                 # Global styles, CSS variables, and theme definitions
│   ├── components/
│   │   ├── AppContent.jsx        # Main layout with navigation and routing logic
│   │   └── ui/                   # Reusable UI component library
│   │       ├── index.js          # Component exports for easy importing
│   │       ├── Button.jsx        # Customizable button component with variants
│   │       ├── Card.jsx          # Card container with glass morphism effects
│   │       ├── Badge.jsx         # Status and label badges
│   │       ├── ProgressBar.jsx   # Progress indicators for course completion
│   │       ├── StatCard.jsx      # Statistics display cards
│   │       ├── CourseCard.jsx    # Course preview cards with enrollment
│   │       ├── Input.jsx         # Form input components
│   │       ├── Modal.jsx         # Modal dialogs and overlays
│   │       └── Alert.jsx         # Notification and alert components
│   ├── context/
│   │   ├── AuthContext.jsx       # Authentication state management
│   │   └── ThemeContext.jsx      # Theme toggle functionality and persistence
│   ├── pages/                    # Page-level components
│   │   ├── LoginPage.jsx         # Authentication interface
│   │   ├── StudentDashboard.jsx  # Student overview and stats
│   │   ├── TeacherDashboard.jsx  # Teacher overview and management
│   │   ├── CourseCatalog.jsx     # Available courses browser
│   │   ├── MyCourses.jsx         # Enrolled courses management
│   │   ├── CourseView.jsx        # Individual course content viewer
│   │   ├── CourseManagement.jsx  # Course creation and editing
│   │   ├── GradingInterface.jsx  # Assignment grading system
│   │   └── Deubug.jsx            # Debug utilities (typo in filename)
│   ├── services/
│   │   └── api.js                # API service layer with localStorage backend
│   ├── data/
│   │   └── mockData.js           # Mock user and course data
│   ├── styles/
│   │   └── theme.js              # Centralized theme color definitions
│   └── utils/
│       └── initStorage.js        # localStorage initialization utilities
```

### 📄 Detailed File Descriptions

#### Configuration Files
- **`.gitignore`**: Excludes `node_modules/`, `build/`, and `dist/` directories from version control
- **`package.json`**: Defines project metadata, dependencies (React, Lucide icons), dev dependencies (Vite, Tailwind), and scripts (`dev`, `build`, `preview`)
- **`vite.config.js`**: Minimal Vite configuration for React plugin
- **`tailwind.config.js`**: Tailwind configuration with custom color palette, dark mode class strategy, and extended utilities
- **`postcss.config.js`**: PostCSS setup for Tailwind CSS processing and Autoprefixer
- **`index.html`**: HTML5 document with viewport meta tags, title "EduLearn LMS", and root div for React mounting

#### Core Application Files
- **`src/main.jsx`**: Entry point that renders the App component in strict mode, imports global CSS
- **`src/App.jsx`**: Root component wrapping app with AuthProvider and ThemeProvider, includes loading state with spinner
- **`src/index.css`**: Global styles with Tailwind imports, CSS custom properties for theming, and component-specific styles (glass effects, animations)

#### Context Providers
- **`src/context/AuthContext.jsx`**: Manages authentication state with login/logout functions, user data, and error handling
- **`src/context/ThemeContext.jsx`**: Handles theme switching between light/dark modes, persists preference in localStorage, toggles 'dark' class on document

#### UI Components
- **`src/components/ui/index.js`**: Barrel export file for all UI components
- **`src/components/ui/Button.jsx`**: Flexible button component with variants (primary, secondary, glass), sizes, and loading states
- **`src/components/ui/Card.jsx`**: Card container with hover effects, glass morphism styling, and theme-aware backgrounds
- **`src/components/ui/Badge.jsx`**: Small status indicators with color variants for different states
- **`src/components/ui/ProgressBar.jsx`**: Animated progress bars for course completion tracking
- **`src/components/ui/StatCard.jsx`**: Dashboard statistic cards with icons and metrics
- **`src/components/ui/CourseCard.jsx`**: Course preview cards with enrollment buttons and progress indicators

#### Page Components
- **`src/components/AppContent.jsx`**: Main layout component with responsive navigation, theme toggle, profile menu, and conditional rendering based on user role
- **`src/pages/LoginPage.jsx`**: Authentication form with username/password fields
- **`src/pages/StudentDashboard.jsx`**: Student-specific dashboard with progress stats and recent activity
- **`src/pages/TeacherDashboard.jsx`**: Teacher dashboard with course management overview
- **`src/pages/CourseCatalog.jsx`**: Browseable list of available courses with search/filter
- **`src/pages/MyCourses.jsx`**: Student's enrolled courses with progress tracking
- **`src/pages/CourseView.jsx`**: Detailed course content viewer with modules and assignments
- **`src/pages/CourseManagement.jsx`**: Course creation and editing interface for teachers
- **`src/pages/GradingInterface.jsx`**: Assignment submission review and grading system

#### Data & Services
- **`src/services/api.js`**: Comprehensive API service with localStorage-based CRUD operations for users, courses, enrollments, progress tracking, and assignments
- **`src/data/mockData.js`**: Sample data including 3 users (2 students, 1 teacher) and 3 courses with modules, assignments, and enrollment data
- **`src/utils/initStorage.js`**: Utility functions to initialize/reset localStorage with mock data

#### Styling & Themes
- **`src/styles/theme.js`**: Centralized color definitions for light and dark themes, exported as structured object
- **`TODO.md`**: Development task tracking with completed and pending items

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd LMSFsd
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🎯 Usage

### Authentication
- **Default Credentials**:
  - Student: Login with any email/password (mock authentication)
  - Teacher: Login with any email/password (mock authentication)
- The app automatically detects user roles and shows appropriate interfaces

### Theme Toggle
- Click the sun/moon icon in the top navigation to switch between light and dark modes
- Theme preference is automatically saved and restored on page reload

### Navigation
- **Students**: Access Dashboard, Course Catalog, and My Learning sections
- **Teachers**: Access Dashboard, Course Management, and Grading Interface
- Mobile-responsive navigation with collapsible menu

## 🔧 Configuration

### Theme Customization
Colors are centralized in `src/styles/theme.js` and can be easily modified:

```javascript
export const theme = {
  colors: {
    light: { /* Light mode colors */ },
    dark: { /* Dark mode colors */ }
  }
};
```

### Tailwind Configuration
Custom colors are defined in `tailwind.config.js` for utility classes.

### CSS Variables
Global CSS variables in `src/index.css` enable dynamic theming.

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎨 Recent Updates

### Dark Mode Enhancement (Latest)
- Updated dark mode color palette to "Nocturne Black" theme
- Improved contrast ratios for better accessibility
- Enhanced visual hierarchy with refined color gradients
- Updated all theme files: `theme.js`, `tailwind.config.js`, and `index.css`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow React best practices and hooks patterns
- Use Tailwind utility classes for styling
- Maintain consistent component structure
- Test theme changes in both light and dark modes
- Ensure responsive design across all screen sizes

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Icons**: Lucide React for beautiful, consistent iconography
- **Styling**: Tailwind CSS for utility-first CSS framework
- **Design Inspiration**: Modern glass morphism and gradient effects
- **Color Palette**: Carefully crafted for optimal readability and aesthetics

---

**Built with ❤️ for modern education management**
