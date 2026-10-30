package com.elearning.controller;

import com.elearning.dto.QuizQuestionDTO;
import com.elearning.dto.QuizResultResponse;
import com.elearning.dto.QuizSubmissionRequest;
import com.elearning.model.Quiz;
import com.elearning.model.QuizSubmission;
import com.elearning.model.User;
import com.elearning.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/quizzes")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @GetMapping("/course/{courseId}")
    public ResponseEntity<?> getQuizByCourse(@PathVariable Long courseId) {
        Optional<Quiz> quizOpt = quizService.getQuizByCourseId(courseId);
        if (quizOpt.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("error", "No quiz available for this course yet"));
        }

        Quiz quiz = quizOpt.get();
        List<QuizQuestionDTO> questions = quizService.getQuestionsForQuiz(quiz.getId());

        Map<String, Object> response = new HashMap<>();
        response.put("id", quiz.getId());
        response.put("courseId", courseId);
        response.put("title", quiz.getTitle());
        response.put("description", quiz.getDescription());
        response.put("passingScore", quiz.getPassingScore());
        response.put("timeLimitMins", quiz.getTimeLimitMins());
        response.put("questions", questions);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/submit")
    public ResponseEntity<?> submitQuiz(
            @RequestBody QuizSubmissionRequest request,
            @AuthenticationPrincipal User currentUser) {
        if (currentUser == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized. Please log in to submit."));
        }
        try {
            QuizResultResponse result = quizService.submitQuiz(currentUser.getId(), request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/my-results")
    public ResponseEntity<?> getMyResults(@AuthenticationPrincipal User currentUser) {
        if (currentUser == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }
        List<QuizSubmission> submissions = quizService.getUserSubmissions(currentUser.getId());
        return ResponseEntity.ok(submissions);
    }
}
