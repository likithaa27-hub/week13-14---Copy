import React from 'react';
import { Rocket, Compass, LayoutDashboard, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ currentTab, onTabChange, onOpenAuthModal }) => {
  const { user, isAuthenticated, logout, quickLogin } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Brand */}
        <div
          className="nav-brand"
          style={{ cursor: 'pointer' }}
          onClick={() => onTabChange('courses')}
        >
          <div style={{
            backgroundColor: 'var(--primary-light)',
            padding: '0.4rem',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Rocket size={24} color="var(--primary-hover)" />
          </div>
          <span>Nova<strong>Learn</strong></span>
        </div>

        {/* Navigation Links */}
        <div className="nav-links">
          <button
            className={`nav-link ${currentTab === 'courses' ? 'active' : ''}`}
            onClick={() => onTabChange('courses')}
          >
            <Compass size={16} />
            <span>Explore Courses</span>
          </button>

          <button
            className={`nav-link ${currentTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => {
              if (!isAuthenticated) {
                onOpenAuthModal('login');
              } else {
                onTabChange('dashboard');
              }
            }}
          >
            <LayoutDashboard size={16} />
            <span>My Learning</span>
          </button>
        </div>

        {/* Auth & Demo Controls */}
        <div className="nav-auth">
          {!isAuthenticated ? (
            <>
              {/* Quick Demo Switchers */}
              <div className="demo-pills">
                <button
                  className="demo-btn"
                  title="Skip sign-up and look around as a student"
                  onClick={() => quickLogin('STUDENT')}
                >
                  ⚡ Try as student
                </button>
                <button
                  className="demo-btn"
                  title="Skip sign-up and look around as an instructor"
                  onClick={() => quickLogin('INSTRUCTOR')}
                >
                  ⚡ Try as instructor
                </button>
              </div>

              <button
                className="btn btn-outline btn-sm"
                onClick={() => onOpenAuthModal('login')}
              >
                <LogIn size={14} /> Log in
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => onOpenAuthModal('register')}
              >
                Join free
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div className="user-profile-badge">
                <div className="user-info-text">
                  <div className="user-name">{user.fullName || user.username}</div>
                  <div className="user-role-tag">{user.role}</div>
                </div>
              </div>

              <button
                className="btn btn-outline btn-sm"
                onClick={logout}
                title="Log out"
              >
                <LogOut size={14} /> Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;