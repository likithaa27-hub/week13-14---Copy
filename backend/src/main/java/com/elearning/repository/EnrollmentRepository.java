package com.elearning.repository;

import com.elearning.model.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByUserIdOrderByEnrolledAtDesc(Long userId);
    Optional<Enrollment> findByUserIdAndCourseId(Long userId, Long courseId);
    Boolean existsByUserIdAndCourseId(Long userId, Long courseId);
    Long countByUserId(Long userId);
    Long countByUserIdAndStatus(Long userId, String status);
}
