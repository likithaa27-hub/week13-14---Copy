package com.elearning.service;

import com.elearning.dto.DashboardStatsResponse;
import com.elearning.repository.EnrollmentRepository;
import com.elearning.repository.LessonCompletionRepository;
import com.elearning.repository.QuizSubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private LessonCompletionRepository lessonCompletionRepository;

    @Autowired
    private QuizSubmissionRepository quizSubmissionRepository;

    public DashboardStatsResponse getStats(Long userId) {
        Long enrolled = enrollmentRepository.countByUserId(userId);
        Long completed = enrollmentRepository.countByUserIdAndStatus(userId, "COMPLETED");
        Long lessonsDone = lessonCompletionRepository.countByUserId(userId);
        Long quizzesPassed = quizSubmissionRepository.countByUserIdAndPassedTrue(userId);
        Double avgScore = quizSubmissionRepository.getAverageScoreByUserId(userId);

        return new DashboardStatsResponse(enrolled, completed, lessonsDone, quizzesPassed, avgScore);
    }
}
