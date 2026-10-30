package com.elearning.service;

import com.elearning.dto.CourseDetailResponse;
import com.elearning.model.Course;
import com.elearning.model.Lesson;
import com.elearning.model.Quiz;
import com.elearning.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuizQuestionRepository quizQuestionRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private LessonCompletionRepository lessonCompletionRepository;

    public List<Course> getAllCourses(String category, String search) {
        if ((category != null && !category.isBlank() && !category.equalsIgnoreCase("All")) || 
            (search != null && !search.isBlank())) {
            String cat = (category != null && !category.equalsIgnoreCase("All") && !category.isBlank()) ? category : null;
            String q = (search != null && !search.isBlank()) ? search.trim() : null;
            return courseRepository.searchCourses(cat, q);
        }
        return courseRepository.findAll();
    }

    public Course getCourseById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + id));
    }

    public List<Lesson> getLessonsByCourseId(Long courseId) {
        return lessonRepository.findByCourseIdOrderBySequenceOrderAsc(courseId);
    }

    public CourseDetailResponse getCourseDetail(Long courseId, Long userId) {
        Course course = getCourseById(courseId);
        List<Lesson> lessons = getLessonsByCourseId(courseId);

        CourseDetailResponse response = new CourseDetailResponse();
        response.setCourse(course);
        response.setLessons(lessons);

        // Quiz summary
        Optional<Quiz> quizOpt = quizRepository.findByCourseId(courseId);
        if (quizOpt.isPresent()) {
            Quiz quiz = quizOpt.get();
            response.setQuizId(quiz.getId());
            response.setQuizTitle(quiz.getTitle());
            response.setPassingScore(quiz.getPassingScore());
            response.setTotalQuizQuestions(quizQuestionRepository.findByQuizId(quiz.getId()).size());
        }

        if (userId != null) {
            enrollmentRepository.findByUserIdAndCourseId(userId, courseId).ifPresentOrElse(enrollment -> {
                response.setIsEnrolled(true);
                response.setProgressPercent(enrollment.getProgressPercent());
            }, () -> {
                response.setIsEnrolled(false);
                response.setProgressPercent(0);
            });

            Set<Long> completedLessonIds = lessonCompletionRepository.findCompletedLessonIdsByUserIdAndCourseId(userId, courseId);
            response.setCompletedLessonIds(completedLessonIds);
        } else {
            response.setIsEnrolled(false);
            response.setProgressPercent(0);
            response.setCompletedLessonIds(Collections.emptySet());
        }

        return response;
    }

    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }
}
