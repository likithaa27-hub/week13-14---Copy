import React, { useEffect, useState } from 'react';
import { X, Clock, Award, BookOpen, CheckCircle2, Star, FileText } from 'lucide-react';
import { coursesAPI } from '../services/api';

const CourseDetailModal = ({ course, isOpen, onClose, onEnroll, isEnrolled, onStartLearning }) => {
  const [courseDetail, setCourseDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (course && isOpen) {
      setLoading(true);
      coursesAPI.getById(course.id)
        .then((data) => {
          setCourseDetail(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [course, isOpen]);

  if (!isOpen || !course) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <BookOpen size={20} color="var(--primary)" />
            <span>Course Syllabus & Overview</span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>Loading course syllabus...</div>
          ) : (
            <div>
              <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <img
                  src={course.thumbnailUrl}
                  alt={course.title}
                  style={{ width: '180px', height: '110px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                />
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <span className="card-category-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '0.5rem' }}>
                    {course.category}
                  </span>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.4rem' }}>{course.title}</h2>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    Taught by <strong>{course.instructorName}</strong>
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <Star size={14} fill="#f59e0b" color="#f59e0b" /> {course.rating}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <Clock size={14} /> {course.duration}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      {/* <Award size={14} /> Certificate on Completion */}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>About this Course</h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {course.description}
                </p>
              </div>

              {/* Topic Syllabus List */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Course Syllabus</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {courseDetail?.lessons?.length || 0} Topics
                  </span>
                </div>

                <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                  {courseDetail?.lessons?.map((lesson, idx) => (
                    <div
                      key={lesson.id}
                      style={{
                        padding: '0.75rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: idx === courseDetail.lessons.length - 1 ? 'none' : '1px solid var(--border)',
                        backgroundColor: idx % 2 === 0 ? 'var(--bg-main)' : 'var(--bg-card)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary)', background: 'var(--primary-light)', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>
                          {idx + 1}
                        </span>
                        <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                          {lesson.title}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <FileText size={13} /> {lesson.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quiz Information Card */}
              {courseDetail?.quizTitle && (
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--primary-light)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-focus)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--primary-dark)', fontSize: '0.95rem' }}>
                      Interactive Assessment: {courseDetail.quizTitle}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>
                      {courseDetail.totalQuizQuestions} Multiple-Choice Questions • {courseDetail.passingScore}% Passing Score
                    </div>
                  </div>
                  <Award size={28} color="var(--primary)" />
                </div>
              )}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>
            Close
          </button>
          {isEnrolled ? (
            <button
              className="btn btn-primary"
              onClick={() => {
                onClose();
                onStartLearning(course.id);
              }}
            >
              Resume Course
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => {
                onClose();
                onEnroll(course.id);
              }}
            >
              Enroll in Course
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailModal;
