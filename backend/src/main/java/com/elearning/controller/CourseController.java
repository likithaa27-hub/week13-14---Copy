package com.elearning.controller;

import com.elearning.dto.CourseDetailResponse;
import com.elearning.model.Course;
import com.elearning.model.Lesson;
import com.elearning.model.User;
import com.elearning.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search) {
        List<Course> courses = courseService.getAllCourses(category, search);
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCourseDetail(
            @PathVariable Long id,
            @AuthenticationPrincipal User currentUser) {
        try {
            Long userId = (currentUser != null) ? currentUser.getId() : null;
            CourseDetailResponse response = courseService.getCourseDetail(id, userId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{id}/lessons")
    public ResponseEntity<List<Lesson>> getCourseLessons(@PathVariable Long id) {
        List<Lesson> lessons = courseService.getLessonsByCourseId(id);
        return ResponseEntity.ok(lessons);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('INSTRUCTOR', 'ADMIN')")
    public ResponseEntity<?> createCourse(
            @RequestBody Course course,
            @AuthenticationPrincipal User currentUser) {
        try {
            if (currentUser != null && (course.getInstructorName() == null || course.getInstructorName().isBlank())) {
                course.setInstructorName(currentUser.getFullName());
            }
            Course created = courseService.createCourse(course);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
