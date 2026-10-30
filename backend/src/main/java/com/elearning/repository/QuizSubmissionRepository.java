package com.elearning.repository;

import com.elearning.model.QuizSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface QuizSubmissionRepository extends JpaRepository<QuizSubmission, Long> {
    List<QuizSubmission> findByUserIdOrderBySubmittedAtDesc(Long userId);
    List<QuizSubmission> findByUserIdAndQuizIdOrderBySubmittedAtDesc(Long userId, Long quizId);
    Long countByUserId(Long userId);
    Long countByUserIdAndPassedTrue(Long userId);

    @Query("SELECT AVG(qs.percentage) FROM QuizSubmission qs WHERE qs.user.id = :userId")
    Double getAverageScoreByUserId(@Param("userId") Long userId);
}
