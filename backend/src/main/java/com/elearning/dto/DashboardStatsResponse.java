package com.elearning.dto;

public class DashboardStatsResponse {
    private Long enrolledCoursesCount;
    private Long completedCoursesCount;
    private Long completedLessonsCount;
    private Long quizzesPassedCount;
    private Double averageQuizScore;

    public DashboardStatsResponse() {}

    public DashboardStatsResponse(Long enrolledCoursesCount, Long completedCoursesCount, Long completedLessonsCount, Long quizzesPassedCount, Double averageQuizScore) {
        this.enrolledCoursesCount = enrolledCoursesCount;
        this.completedCoursesCount = completedCoursesCount;
        this.completedLessonsCount = completedLessonsCount;
        this.quizzesPassedCount = quizzesPassedCount;
        this.averageQuizScore = averageQuizScore != null ? Math.round(averageQuizScore * 10.0) / 10.0 : 0.0;
    }

    public Long getEnrolledCoursesCount() { return enrolledCoursesCount; }
    public void setEnrolledCoursesCount(Long enrolledCoursesCount) { this.enrolledCoursesCount = enrolledCoursesCount; }

    public Long getCompletedCoursesCount() { return completedCoursesCount; }
    public void setCompletedCoursesCount(Long completedCoursesCount) { this.completedCoursesCount = completedCoursesCount; }

    public Long getCompletedLessonsCount() { return completedLessonsCount; }
    public void setCompletedLessonsCount(Long completedLessonsCount) { this.completedLessonsCount = completedLessonsCount; }

    public Long getQuizzesPassedCount() { return quizzesPassedCount; }
    public void setQuizzesPassedCount(Long quizzesPassedCount) { this.quizzesPassedCount = quizzesPassedCount; }

    public Double getAverageQuizScore() { return averageQuizScore; }
    public void setAverageQuizScore(Double averageQuizScore) { this.averageQuizScore = averageQuizScore; }
}
