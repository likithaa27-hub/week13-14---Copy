package com.elearning.service;

import com.elearning.dto.QuizQuestionDTO;
import com.elearning.dto.QuizResultResponse;
import com.elearning.dto.QuizSubmissionRequest;
import com.elearning.model.Quiz;
import com.elearning.model.QuizQuestion;
import com.elearning.model.QuizSubmission;
import com.elearning.model.User;
import com.elearning.repository.QuizQuestionRepository;
import com.elearning.repository.QuizRepository;
import com.elearning.repository.QuizSubmissionRepository;
import com.elearning.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuizQuestionRepository quizQuestionRepository;

    @Autowired
    private QuizSubmissionRepository quizSubmissionRepository;

    @Autowired
    private UserRepository userRepository;

    public Optional<Quiz> getQuizByCourseId(Long courseId) {
        return quizRepository.findByCourseId(courseId);
    }

    public List<QuizQuestionDTO> getQuestionsForQuiz(Long quizId) {
        List<QuizQuestion> questions = quizQuestionRepository.findByQuizId(quizId);
        return questions.stream().map(QuizQuestionDTO::new).collect(Collectors.toList());
    }

    @Transactional
    public QuizResultResponse submitQuiz(Long userId, QuizSubmissionRequest request) {
        Quiz quiz = quizRepository.findById(request.getQuizId())
                .orElseThrow(() -> new RuntimeException("Quiz not found with id: " + request.getQuizId()));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        List<QuizQuestion> questions = quizQuestionRepository.findByQuizId(quiz.getId());
        Map<Long, String> userAnswers = request.getAnswers() != null ? request.getAnswers() : Map.of();

        int score = 0;
        int totalQuestions = questions.size();
        List<QuizResultResponse.QuestionFeedback> feedbackList = new ArrayList<>();

        for (QuizQuestion q : questions) {
            String selectedOption = userAnswers.get(q.getId());
            boolean isCorrect = selectedOption != null && selectedOption.equalsIgnoreCase(q.getCorrectOption());
            if (isCorrect) {
                score++;
            }

            feedbackList.add(new QuizResultResponse.QuestionFeedback(
                    q.getId(),
                    q.getQuestionText(),
                    selectedOption != null ? selectedOption.toUpperCase() : "None",
                    q.getCorrectOption().toUpperCase(),
                    isCorrect,
                    q.getExplanation()
            ));
        }

        int percentage = totalQuestions > 0 ? (int) Math.round(((double) score / totalQuestions) * 100) : 0;
        boolean passed = percentage >= quiz.getPassingScore();

        QuizSubmission submission = new QuizSubmission(user, quiz, score, totalQuestions, percentage, passed);
        QuizSubmission savedSubmission = quizSubmissionRepository.save(submission);

        QuizResultResponse response = new QuizResultResponse();
        response.setSubmissionId(savedSubmission.getId());
        response.setQuizId(quiz.getId());
        response.setQuizTitle(quiz.getTitle());
        response.setScore(score);
        response.setTotalQuestions(totalQuestions);
        response.setPercentage(percentage);
        response.setPassingScore(quiz.getPassingScore());
        response.setPassed(passed);
        response.setFeedbackList(feedbackList);

        return response;
    }

    public List<QuizSubmission> getUserSubmissions(Long userId) {
        return quizSubmissionRepository.findByUserIdOrderBySubmittedAtDesc(userId);
    }
}
