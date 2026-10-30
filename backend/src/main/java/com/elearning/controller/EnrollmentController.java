package com.elearning.controller;

import com.elearning.model.Enrollment;
import com.elearning.model.User;
import com.elearning.service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    @PostMapping("/enroll/{courseId}")
    public ResponseEntity<?> enrollInCourse(
            @PathVariable Long courseId,
            @AuthenticationPrincipal User currentUser) {
        if (currentUser == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Please login to enroll"));
        }
        try {
            Enrollment enrollment = enrollmentService.enroll(currentUser.getId(), courseId);
            return ResponseEntity.ok(enrollment);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/my-courses")
    public ResponseEntity<?> getMyCourses(@AuthenticationPrincipal User currentUser) {
        if (currentUser == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }
        List<Enrollment> enrollments = enrollmentService.getUserEnrollments(currentUser.getId());
        return ResponseEntity.ok(enrollments);
    }

    @PostMapping("/lessons/{lessonId}/complete")
    public ResponseEntity<?> completeLesson(
            @PathVariable Long lessonId,
            @AuthenticationPrincipal User currentUser) {
        if (currentUser == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }
        try {
            Enrollment updatedEnrollment = enrollmentService.completeLesson(currentUser.getId(), lessonId);
            return ResponseEntity.ok(updatedEnrollment);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/course/{courseId}/completed-lessons")
    public ResponseEntity<?> getCompletedLessons(
            @PathVariable Long courseId,
            @AuthenticationPrincipal User currentUser) {
        if (currentUser == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }
        Set<Long> completedIds = enrollmentService.getCompletedLessonIds(currentUser.getId(), courseId);
        return ResponseEntity.ok(completedIds);
    }
}
