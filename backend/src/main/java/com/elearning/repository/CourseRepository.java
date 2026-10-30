package com.elearning.repository;

import com.elearning.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByCategory(String category);

    @Query("SELECT c FROM Course c WHERE " +
           "(:category IS NULL OR LOWER(c.category) = LOWER(:category)) AND " +
           "(:search IS NULL OR LOWER(c.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(c.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Course> searchCourses(@Param("category") String category, @Param("search") String search);
}
