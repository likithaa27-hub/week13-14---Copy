import React, { useState, useEffect } from 'react';
import { Sparkles, BookOpen } from 'lucide-react';
import { coursesAPI, enrollmentAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import CourseCard from '../components/CourseCard';
import CourseFilter from '../components/CourseFilter';
import CourseDetailModal from '../components/CourseDetailModal';

const CoursesPage = ({ onSelectCourse, onOpenAuthModal }) => {
  const { isAuthenticated } = useAuth();
  const [courses, setCourses] = useState([]);
  const [enrolledMap, setEnrolledMap] = useState({}); // courseId -> enrollment
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [loading, setLoading] = useState(true);
  const [activeCourseModal, setActiveCourseModal] = useState(null);

  const fetchCoursesAndEnrollments = async () => {
    try {
      setLoading(true);
      const coursesData = await coursesAPI.getAll(selectedCategory, searchQuery);
      setCourses(coursesData);

      if (isAuthenticated) {
        const myEnrollments = await enrollmentAPI.getMyCourses().catch(() => []);
        const map = {};
        myEnrollments.forEach((e) => {
          if (e.course) map[e.course.id] = e;
        });
        setEnrolledMap(map);
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoursesAndEnrollments();
  }, [selectedCategory, searchQuery, isAuthenticated]);

  const handleEnroll = async (courseId) => {
    if (!isAuthenticated) {
      onOpenAuthModal('login');
      return;
    }
    try {
      const res = await enrollmentAPI.enroll(courseId);
      setEnrolledMap((prev) => ({ ...prev, [courseId]: res }));
      alert("You're in! Opening your course...");
      onSelectCourse(courseId);
    } catch (err) {
      alert("We couldn't enroll you: " + err.message);
    }
  };

  // Filter courses by level client-side if level is set
  const filteredCourses = courses.filter((c) => {
    if (selectedLevel !== 'All' && c.level !== selectedLevel) return false;
    return true;
  });

  return (
    <div>
      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-content">
          <div className="hero-tag">
            <Sparkles size={16} /> Learn at your own pace
          </div>
          <h1 className="hero-title">
            Science makes more sense when you can actually see how it works.
          </h1>
          <p className="hero-desc">
            Pick a subject, work through five short lessons, then take a quiz to check
            what stuck. Physics, chemistry, math and biology, all in one place.
          </p>

          <div className="hero-stats-row">
            <div className="hero-stat-item">
              <span className="hero-stat-value">4</span>
              <span className="hero-stat-label">Subjects</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-value">20</span>
              <span className="hero-stat-label">Bite-sized lessons</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-value">4</span>
              <span className="hero-stat-label">Quizzes to test yourself</span>
            </div>
          </div>
        </div>
      </div>

      {/* Course Filter Bar */}
      <CourseFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedLevel={selectedLevel}
        onLevelChange={setSelectedLevel}
      />

      {/* Courses Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Loading courses...
          </div>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
          <BookOpen size={48} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
          <h3>Nothing matches yet</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Try a different keyword, or reset the subject and level filters.
          </p>
        </div>
      ) : (
        <div className="courses-grid">
          {filteredCourses.map((course) => {
            const enrollment = enrolledMap[course.id];
            const isEnrolled = !!enrollment;
            const progressPercent = enrollment?.progressPercent || 0;

            return (
              <CourseCard
                key={course.id}
                course={course}
                isEnrolled={isEnrolled}
                progressPercent={progressPercent}
                onEnroll={handleEnroll}
                onViewDetails={(c) => setActiveCourseModal(c)}
                onContinue={(cId) => onSelectCourse(cId)}
              />
            );
          })}
        </div>
      )}

      {/* Course Detail Modal */}
      <CourseDetailModal
        course={activeCourseModal}
        isOpen={!!activeCourseModal}
        onClose={() => setActiveCourseModal(null)}
        onEnroll={handleEnroll}
        isEnrolled={activeCourseModal && !!enrolledMap[activeCourseModal.id]}
        onStartLearning={(cId) => onSelectCourse(cId)}
      />
    </div>
  );
};

export default CoursesPage;