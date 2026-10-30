import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, Circle, BookOpen, Award, Clock, FileText } from 'lucide-react';
import { coursesAPI, enrollmentAPI } from '../services/api';
import ProgressBar from './ProgressBar';
import QuizModal from './QuizModal';

/* ── subject colour theming ─────────────────────────────── */
const SUBJECT_THEMES = {
  Physics:     { bg: '#eff6ff', accent: '#2563eb', badge: '#dbeafe', text: '#1e40af', emoji: '⚛️' },
  Chemistry:   { bg: '#f0fdf4', accent: '#16a34a', badge: '#dcfce7', text: '#15803d', emoji: '🧪' },
  Mathematics: { bg: '#faf5ff', accent: '#7c3aed', badge: '#ede9fe', text: '#6d28d9', emoji: '📐' },
  Biology:     { bg: '#fff7ed', accent: '#ea580c', badge: '#ffedd5', text: '#c2410c', emoji: '🌿' },
};

const getTheme = (category) => SUBJECT_THEMES[category] || SUBJECT_THEMES['Physics'];

const LessonViewer = ({ courseId, onBack }) => {
  const [courseDetail, setCourseDetail] = useState(null);
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [completedLessonIds, setCompletedLessonIds] = useState(new Set());
  const [progressPercent, setProgressPercent] = useState(0);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchCourseData = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const data = await coursesAPI.getById(courseId);
      setCourseDetail(data);
      setProgressPercent(data.progressPercent || 0);
      if (data.completedLessonIds) {
        setCompletedLessonIds(new Set(data.completedLessonIds));
      }
    } catch (err) {
      console.error('Error fetching course:', err);
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  const activeLesson = courseDetail?.lessons?.[activeLessonIdx];
  const isCurrentLessonCompleted = activeLesson && completedLessonIds.has(activeLesson.id);

  const handleMarkComplete = async () => {
    if (!activeLesson) return;
    try {
      const res = await enrollmentAPI.completeLesson(activeLesson.id);
      setCompletedLessonIds((prev) => new Set([...prev, activeLesson.id]));
      setProgressPercent(res.progressPercent);

      // Auto-advance to next lesson if available
      if (activeLessonIdx < (courseDetail?.lessons?.length || 0) - 1) {
        setActiveLessonIdx((prev) => prev + 1);
      }
    } catch (err) {
      alert('Error updating lesson progress: ' + err.message);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '4rem' }}>Loading course content...</div>;
  }

  if (!courseDetail || !courseDetail.course) {
    return <div style={{ textAlign: 'center', padding: '4rem' }}>Course not found.</div>;
  }

  const { course, lessons = [] } = courseDetail;
  const theme = getTheme(course.category);

  return (
    <div>
      {/* Top Navigation Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <button className="btn btn-outline btn-sm" onClick={onBack}>
          <ArrowLeft size={16} /> Back to Courses
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <strong>{completedLessonIds.size}</strong> of <strong>{lessons.length}</strong> topics completed
          </span>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setIsQuizOpen(true)}
          >
            <Award size={16} /> Take Quiz
          </button>
        </div>
      </div>

      {/* Main Learning Hub Layout */}
      <div className="player-layout">
        {/* Left Column: Topic Content Reader */}
        <div className="player-main">
          {activeLesson ? (
            <>
              {/* Subject / Topic Header Banner */}
              <div className="topic-banner" style={{ backgroundColor: theme.bg, borderBottom: `3px solid ${theme.accent}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className="topic-emoji">{theme.emoji}</span>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                      <span
                        className="topic-subject-badge"
                        style={{ backgroundColor: theme.badge, color: theme.text }}
                      >
                        {course.category}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={13} /> {activeLesson.duration}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: theme.text, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Topic {activeLessonIdx + 1} of {lessons.length}
                    </div>
                  </div>
                </div>
              </div>

              {/* Lesson Text / Notes */}
              <div className="lesson-content">
                <h1 className="lesson-title">{activeLesson.title}</h1>

                {/* Decorated content block */}
                <div className="topic-content-block" style={{ borderLeft: `4px solid ${theme.accent}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
                    <FileText size={15} color={theme.accent} />
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: theme.text, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Lesson Notes
                    </span>
                  </div>
                  <p className="lesson-body">{activeLesson.content}</p>
                </div>

                {/* Mark as Complete Action */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.25rem', borderTop: '1px solid var(--border)' }}>
                  <button
                    className={`btn ${isCurrentLessonCompleted ? 'btn-success' : 'btn-primary'}`}
                    onClick={handleMarkComplete}
                  >
                    <CheckCircle2 size={18} />
                    {isCurrentLessonCompleted ? 'Completed ✓' : 'Mark Topic as Complete'}
                  </button>

                  {activeLessonIdx < lessons.length - 1 ? (
                    <button
                      className="btn btn-outline"
                      onClick={() => setActiveLessonIdx((prev) => prev + 1)}
                    >
                      Next Topic →
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => setIsQuizOpen(true)}
                    >
                      <Award size={18} /> Take Course Quiz →
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div style={{ padding: '3rem', textAlign: 'center' }}>No topics available.</div>
          )}
        </div>

        {/* Right Column: Topic Checklist Sidebar */}
        <div className="curriculum-sidebar">
          <div className="curriculum-header">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>{course.title}</h3>
            <ProgressBar percent={progressPercent} />
          </div>

          <ul className="curriculum-list">
            {lessons.map((lesson, idx) => {
              const isCompleted = completedLessonIds.has(lesson.id);
              const isActive = idx === activeLessonIdx;

              return (
                <li
                  key={lesson.id}
                  className={`curriculum-item ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveLessonIdx(idx)}
                >
                  <div className="item-left">
                    {isCompleted ? (
                      <CheckCircle2 size={18} color="var(--success)" />
                    ) : (
                      <Circle size={18} color="var(--text-muted)" />
                    )}
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: isActive ? 700 : 500, color: 'var(--text-primary)' }}>
                        {idx + 1}. {lesson.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{lesson.duration}</div>
                    </div>
                  </div>
                  {isActive && <BookOpen size={15} color={theme.accent} />}
                </li>
              );
            })}
          </ul>

          {/* Interactive Quiz Trigger in Sidebar */}
          <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-subtle)', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Award size={18} color="var(--primary)" />
              <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Final Assessment</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>
              Answer {courseDetail.totalQuizQuestions || 5} questions and score 60%+ to pass.
            </p>
            <button
              className="btn btn-primary btn-sm"
              style={{ width: '100%' }}
              onClick={() => setIsQuizOpen(true)}
            >
              Start Quiz Assessment
            </button>
          </div>
        </div>
      </div>

      {/* Quiz Modal */}
      <QuizModal
        courseId={courseId}
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onQuizCompleted={() => fetchCourseData(true)}
      />
    </div>
  );
};

export default LessonViewer;

