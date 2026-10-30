import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CoursesPage from './pages/CoursesPage';
import DashboardPage from './pages/DashboardPage';
import LessonViewer from './components/LessonViewer';
import AuthModal from './components/AuthModal';

const MainApp = () => {
  const { isAuthenticated } = useAuth();
  const [currentTab, setCurrentTab] = useState('courses'); // 'courses' | 'dashboard' | 'learn'
  const [activeCourseId, setActiveCourseId] = useState(null);
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });

  const handleSelectCourse = (courseId) => {
    setActiveCourseId(courseId);
    setCurrentTab('learn');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuthModal = (mode = 'login') => {
    setAuthModal({ isOpen: true, mode });
  };

  const handleCloseAuthModal = () => {
    setAuthModal({ isOpen: false, mode: 'login' });
  };

  return (
    <div className="app-container">
      {/* Navigation */}
      <Navbar
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          if (tab !== 'learn') setActiveCourseId(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAuthModal={handleOpenAuthModal}
      />

      {/* Main Page Content */}
      <main className="main-content">
        {currentTab === 'courses' && (
          <CoursesPage
            onSelectCourse={handleSelectCourse}
            onOpenAuthModal={handleOpenAuthModal}
          />
        )}

        {currentTab === 'dashboard' && (
          <DashboardPage
            onSelectCourse={handleSelectCourse}
            onBrowseCourses={() => {
              setCurrentTab('courses');
              setActiveCourseId(null);
            }}
          />
        )}

        {currentTab === 'learn' && activeCourseId && (
          <LessonViewer
            courseId={activeCourseId}
            onBack={() => {
              setCurrentTab('courses');
              setActiveCourseId(null);
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        onClose={handleCloseAuthModal}
      />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;
