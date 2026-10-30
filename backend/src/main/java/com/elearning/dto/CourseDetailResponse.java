package com.elearning.dto;

import com.elearning.model.Course;
import com.elearning.model.Lesson;
import java.util.List;
import java.util.Set;

public class CourseDetailResponse {
    private Course course;
    private List<Lesson> lessons;
    private Boolean isEnrolled;
    private Integer progressPercent;
    private Set<Long> completedLessonIds;
    private Long quizId;
    private String quizTitle;
    private Integer passingScore;
    private Integer totalQuizQuestions;

    public CourseDetailResponse() {}

    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }

    public List<Lesson> getLessons() { return lessons; }
    public void setLessons(List<Lesson> lessons) { this.lessons = lessons; }

    public Boolean getIsEnrolled() { return isEnrolled; }
    public void setIsEnrolled(Boolean isEnrolled) { this.isEnrolled = isEnrolled; }

    public Integer getProgressPercent() { return progressPercent; }
    public void setProgressPercent(Integer progressPercent) { this.progressPercent = progressPercent; }

    public Set<Long> getCompletedLessonIds() { return completedLessonIds; }
    public void setCompletedLessonIds(Set<Long> completedLessonIds) { this.completedLessonIds = completedLessonIds; }

    public Long getQuizId() { return quizId; }
    public void setQuizId(Long quizId) { this.quizId = quizId; }

    public String getQuizTitle() { return quizTitle; }
    public void setQuizTitle(String quizTitle) { this.quizTitle = quizTitle; }

    public Integer getPassingScore() { return passingScore; }
    public void setPassingScore(Integer passingScore) { this.passingScore = passingScore; }

    public Integer getTotalQuizQuestions() { return totalQuizQuestions; }
    public void setTotalQuizQuestions(Integer totalQuizQuestions) { this.totalQuizQuestions = totalQuizQuestions; }
}
