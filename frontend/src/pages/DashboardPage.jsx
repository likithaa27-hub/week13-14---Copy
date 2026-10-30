import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle, Award, TrendingUp, Play, Calendar, Star, ArrowRight } from 'lucide-react';
import { dashboardAPI, enrollmentAPI, quizAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import ProgressBar from '../components/ProgressBar';

const DashboardPage = ({ onSelectCourse, onBrowseCourses }) => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, enrollmentsData, resultsData] = await Promise.all([
        dashboardAPI.getStats().catch(() => null),
        enrollmentAPI.getMyCourses().catch(() => []),
        quizAPI.getMyResults().catch(() => [])
      ]);

      setStats(statsData);
      setEnrollments(enrollmentsData || []);
      setQuizResults(resultsData || []);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '4rem' }}>Loading user dashboard...</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          Welcome back, {user?.fullName || user?.username || 'Learner'}! 
        </h1>
        <p className="dashboard-subtitle">
          Track your course enrollments, learning progress, and interactive quiz achievements in one place.
        </p>
      </div>

      {/* 4 Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-primary">
            <BookOpen size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-number">{stats?.enrolledCoursesCount || enrollments.length}</span>
            <span className="stat-label">Enrolled Courses</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-success">
            <CheckCircle size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-number">{stats?.completedCoursesCount || 0}</span>
            <span className="stat-label">Courses Completed</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-secondary">
            <TrendingUp size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-number">{stats?.completedLessonsCount || 0}</span>
            <span className="stat-label">Lessons Completed</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-warning">
            <Award size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-number">
              {stats?.quizzesPassedCount || 0}
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                {' '}({stats?.averageQuizScore || 0}%)
              </span>
            </span>
            <span className="stat-label">Quizzes Passed (Avg)</span>
          </div>
        </div>
      </div>

      {/* Enrolled Courses Section */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">
            <BookOpen size={20} color="var(--primary)" />
            <span>My Active Courses</span>
          </h2>
          <button className="btn btn-outline btn-sm" onClick={onBrowseCourses}>
            Browse More Courses <ArrowRight size={14} />
          </button>
        </div>

        {enrollments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-secondary)' }}>
            <p style={{ marginBottom: '1rem', fontSize: '1.05rem' }}>You haven't enrolled in any courses yet.</p>
            <button className="btn btn-primary" onClick={onBrowseCourses}>
              Explore Course Catalog
            </button>
          </div>
        ) : (
          <div className="enrolled-grid">
            {enrollments.map((enr) => {
              const course = enr.course;
              return (
                <div key={enr.id} className="enrolled-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span className="card-category-badge" style={{ position: 'static' }}>
                      {course.category}
                    </span>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: enr.status === 'COMPLETED' ? 'var(--success-light)' : 'var(--primary-light)',
                      color: enr.status === 'COMPLETED' ? 'var(--success)' : 'var(--primary)'
                    }}>
                      {enr.status}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0.25rem 0' }}>
                    {course.title}
                  </h3>

                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Instructor: <strong>{course.instructorName}</strong>
                  </div>

                  <ProgressBar percent={enr.progressPercent} />

                  <div style={{ marginTop: '0.5rem' }}>
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ width: '100%' }}
                      onClick={() => onSelectCourse(course.id)}
                    >
                      <Play size={14} /> {enr.progressPercent > 0 ? 'Resume Learning' : 'Start Course'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quiz Assessment History */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">
            <Award size={20} color="var(--primary)" />
            <span>Quiz Assessment History</span>
          </h2>
        </div>

        {quizResults.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
            No quizzes taken yet. Complete course modules and take quizzes to build your learning record!
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)', color: 'var(--text-secondary)' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>Quiz Title</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Score</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Percentage</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Result Status</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Attempt Date</th>
                </tr>
              </thead>
              <tbody>
                {quizResults.map((sub) => (
                  <tr key={sub.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>
                      {sub.quiz?.title || 'Course Assessment'}
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      {sub.score} / {sub.totalQuestions}
                    </td>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>
                      {sub.percentage}%
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <span style={{
                        padding: '0.25rem 0.65rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        backgroundColor: sub.passed ? 'var(--success-light)' : 'var(--danger-light)',
                        color: sub.passed ? 'var(--success)' : 'var(--danger)'
                      }}>
                        {sub.passed ? 'PASSED' : 'FAILED'}
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                      {sub.submittedAt ? new Date(sub.submittedAt).toLocaleDateString() : 'Recent'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
