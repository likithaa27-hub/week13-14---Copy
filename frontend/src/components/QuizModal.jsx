import React, { useState, useEffect } from 'react';
import { X, Award, CheckCircle, XCircle, Clock, ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react';
import { quizAPI } from '../services/api';

const QuizModal = ({ courseId, isOpen, onClose, onQuizCompleted }) => {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // questionId -> selectedOption ('A','B','C','D')
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes default

  useEffect(() => {
    if (courseId && isOpen) {
      setLoading(true);
      setResult(null);
      setAnswers({});
      setCurrentIdx(0);
      quizAPI.getByCourse(courseId)
        .then((data) => {
          setQuizData(data);
          setTimeLeft((data.timeLimitMins || 10) * 60);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [courseId, isOpen]);

  // Timer countdown
  useEffect(() => {
    if (!isOpen || result || loading || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, result, loading, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSelectOption = (questionId, optionLetter) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionLetter
    }));
  };

  const handleSubmit = async () => {
    if (!quizData) return;
    setSubmitting(true);
    try {
      const res = await quizAPI.submit(quizData.id, answers);
      setResult(res);
      if (onQuizCompleted) onQuizCompleted(res);
    } catch (err) {
      alert('Error submitting quiz: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const questions = quizData?.questions || [];
  const currentQ = questions[currentIdx];
  const isAnswered = currentQ && !!answers[currentQ.id];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">
            <Award size={20} color="var(--primary)" />
            <span>{quizData ? quizData.title : 'Interactive Assessment'}</span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>Loading Quiz Questions...</div>
            </div>
          ) : !quizData || questions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
              No quiz questions available for this course.
            </div>
          ) : result ? (
            /* Results View */
            <div className="result-card">
              <div className={`score-circle ${result.passed ? 'passed' : 'failed'}`}>
                <div className="score-percentage">{result.score} / {result.totalQuestions}</div>
                <div className="score-label">{result.percentage}% • {result.passed ? 'PASSED' : 'FAILED'}</div>
              </div>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                {result.passed ? '🎉 Congratulations! Quiz Passed!' : 'Assessment Completed'}
              </h2>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1.5rem',
                backgroundColor: 'var(--bg-subtle)',
                padding: '0.85rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                margin: '0.75rem 0 1.5rem 0',
                border: '1px solid var(--border)'
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Your Score</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: result.passed ? 'var(--success)' : 'var(--danger)' }}>
                    {result.score} / {result.totalQuestions}
                  </div>
                </div>
                <div style={{ width: '1px', height: '36px', backgroundColor: 'var(--border)' }} />
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Percentage</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)' }}>
                    {result.percentage}%
                  </div>
                </div>
                <div style={{ width: '1px', height: '36px', backgroundColor: 'var(--border)' }} />
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Passing Mark</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-secondary)' }}>
                    {result.passingScore}%
                  </div>
                </div>
              </div>

              {/* Feedback Breakdown */}
              <div style={{ textAlign: 'left', marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
                  Question-by-Question Review & Explanations:
                </h3>
                {result.feedbackList?.map((item, idx) => (
                  <div key={item.questionId} className={`feedback-item ${item.isCorrect ? 'correct' : 'incorrect'}`}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                        {idx + 1}. {item.questionText}
                      </span>
                      {item.isCorrect ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--success)', fontWeight: 700, fontSize: '0.8rem' }}>
                          <CheckCircle size={16} /> Correct
                        </span>
                      ) : (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--danger)', fontWeight: 700, fontSize: '0.8rem' }}>
                          <XCircle size={16} /> Incorrect
                        </span>
                      )}
                    </div>

                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                      Your Answer: <strong>Option {item.selectedOption}</strong>
                      {!item.isCorrect && (
                        <span style={{ marginLeft: '1rem', color: 'var(--success)', fontWeight: 600 }}>
                          Correct: Option {item.correctOption}
                        </span>
                      )}
                    </div>

                    <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', backgroundColor: 'rgba(255,255,255,0.7)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                      💡 <strong>Explanation:</strong> {item.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Quiz Questions View */
            <div>
              {/* Stepper & Timer Bar */}
              <div className="quiz-stepper">
                <span className="question-badge">
                  Question {currentIdx + 1} of {questions.length}
                </span>

                <div className="quiz-timer">
                  <Clock size={16} color="var(--primary)" />
                  <span>Time Left: <strong>{formatTime(timeLeft)}</strong></span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="progress-track" style={{ marginBottom: '1.5rem', height: '6px' }}>
                <div
                  className="progress-fill"
                  style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <div className="question-text">
                {currentQ.questionText}
              </div>

              {/* Options */}
              <div className="options-list">
                {[
                  { key: 'A', text: currentQ.optionA },
                  { key: 'B', text: currentQ.optionB },
                  { key: 'C', text: currentQ.optionC },
                  { key: 'D', text: currentQ.optionD }
                ].map((opt) => {
                  const isSelected = answers[currentQ.id] === opt.key;
                  return (
                    <div
                      key={opt.key}
                      className={`option-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleSelectOption(currentQ.id, opt.key)}
                    >
                      <div className="option-letter">{opt.key}</div>
                      <div style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{opt.text}</div>
                    </div>
                  );
                })}
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'right' }}>
                Answered: {answeredCount} / {questions.length} questions
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          {result ? (
            <>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setResult(null);
                  setAnswers({});
                  setCurrentIdx(0);
                  setTimeLeft((quizData.timeLimitMins || 10) * 60);
                }}
              >
                <RotateCcw size={16} /> Retake Quiz
              </button>
              <button className="btn btn-primary" onClick={onClose}>
                Done & Return to Course
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-outline"
                onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                disabled={currentIdx === 0}
                style={{ opacity: currentIdx === 0 ? 0.5 : 1 }}
              >
                <ChevronLeft size={16} /> Previous
              </button>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {currentIdx < questions.length - 1 ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => setCurrentIdx((prev) => Math.min(questions.length - 1, prev + 1))}
                  >
                    Next Question <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    className="btn btn-success"
                    onClick={handleSubmit}
                    disabled={submitting}
                  >
                    {submitting ? 'Grading Answers...' : `Submit Assessment (${answeredCount}/${questions.length})`}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
