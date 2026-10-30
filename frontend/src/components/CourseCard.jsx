import React from 'react';
import { Star, Clock, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import ProgressBar from './ProgressBar';

const CourseCard = ({ course, isEnrolled, progressPercent, onEnroll, onViewDetails, onContinue }) => {
  return (
    <div className="course-card">
      <div className="card-body">
        <div className="card-badges-row" style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.6rem' }}>
          <span className="card-category-badge">{course.category}</span>
          <span className="card-level-badge">{course.level}</span>
        </div>
        <div className="card-meta-row">
          <div className="card-rating">
            <Star size={15} fill="#f59e0b" color="#f59e0b" />
            <span>{course.rating || '4.8'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Clock size={14} />
            <span>{course.duration || '4 Weeks'}</span>
          </div>
        </div>

        <h3 className="card-title">{course.title}</h3>
        <p className="card-desc">{course.description}</p>

        <div className="card-instructor">
          <BookOpen size={15} color="var(--primary)" />
          <span>By <strong>{course.instructorName}</strong></span>
        </div>

        {isEnrolled && (
          <ProgressBar percent={progressPercent} />
        )}

        <div className="card-footer">
          <button
            onClick={() => onViewDetails(course)}
            className="btn btn-outline btn-sm"
            style={{ flex: 1 }}
          >
            Syllabus
          </button>

          {isEnrolled ? (
            <button
              onClick={() => onContinue(course.id)}
              className="btn btn-primary btn-sm"
              style={{ flex: 1 }}
            >
              Resume <ArrowRight size={14} />
            </button>
          ) : (
            <button
              onClick={() => onEnroll(course.id)}
              className="btn btn-primary btn-sm"
              style={{ flex: 1 }}
            >
              Enroll Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
