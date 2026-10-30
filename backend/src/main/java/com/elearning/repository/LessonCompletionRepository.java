package com.elearning.repository;

import com.elearning.model.LessonCompletion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
//import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface LessonCompletionRepository extends JpaRepository<LessonCompletion, Long> {
    Optional<LessonCompletion> findByUserIdAndLessonId(Long userId, Long lessonId);
    Boolean existsByUserIdAndLessonId(Long userId, Long lessonId);

    @Query("SELECT lc.lesson.id FROM LessonCompletion lc WHERE lc.user.id = :userId AND lc.lesson.course.id = :courseId")
    Set<Long> findCompletedLessonIdsByUserIdAndCourseId(@Param("userId") Long userId, @Param("courseId") Long courseId);

    @Query("SELECT COUNT(lc) FROM LessonCompletion lc WHERE lc.user.id = :userId AND lc.lesson.course.id = :courseId")
    Long countByUserIdAndCourseId(@Param("userId") Long userId, @Param("courseId") Long courseId);

    Long countByUserId(Long userId);
}
