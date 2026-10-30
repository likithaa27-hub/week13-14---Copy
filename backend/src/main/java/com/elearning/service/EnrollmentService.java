package com.elearning.service;

import com.elearning.model.Course;
import com.elearning.model.Enrollment;
import com.elearning.model.Lesson;
import com.elearning.model.LessonCompletion;
import com.elearning.model.User;
import com.elearning.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private LessonCompletionRepository lessonCompletionRepository;

    @Transactional
    public Enrollment enroll(Long userId, Long courseId) {
        Optional<Enrollment> existing = enrollmentRepository.findByUserIdAndCourseId(userId, courseId);
        if (existing.isPresent()) {
            return existing.get();
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Enrollment enrollment = new Enrollment(user, course);
        return enrollmentRepository.save(enrollment);
    }

    public List<Enrollment> getUserEnrollments(Long userId) {
        return enrollmentRepository.findByUserIdOrderByEnrolledAtDesc(userId);
    }

    @Transactional
    public Enrollment completeLesson(Long userId, Long lessonId) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Long courseId = lesson.getCourse().getId();

        // Check if already completed
        if (!lessonCompletionRepository.existsByUserIdAndLessonId(userId, lessonId)) {
            LessonCompletion completion = new LessonCompletion(user, lesson);
            lessonCompletionRepository.save(completion);
        }

        // Ensure user is enrolled
        Enrollment enrollment = enrollmentRepository.findByUserIdAndCourseId(userId, courseId)
                .orElseGet(() -> enroll(userId, courseId));

        // Recalculate progress
        long totalLessons = lessonRepository.countByCourseId(courseId);
        long completedLessons = lessonCompletionRepository.countByUserIdAndCourseId(userId, courseId);

        int progressPercent = (totalLessons > 0) ? (int) Math.min(100, (completedLessons * 100) / totalLessons) : 0;
        enrollment.setProgressPercent(progressPercent);

        if (progressPercent >= 100) {
            enrollment.setStatus("COMPLETED");
        } else {
            enrollment.setStatus("IN_PROGRESS");
        }

        return enrollmentRepository.save(enrollment);
    }

    public Set<Long> getCompletedLessonIds(Long userId, Long courseId) {
        return lessonCompletionRepository.findCompletedLessonIdsByUserIdAndCourseId(userId, courseId);
    }
}
