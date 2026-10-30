package com.elearning.dto;

import com.elearning.model.QuizQuestion;

public class QuizQuestionDTO {
    private Long id;
    private String questionText;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;

    public QuizQuestionDTO() {}

    public QuizQuestionDTO(QuizQuestion q) {
        this.id = q.getId();
        this.questionText = q.getQuestionText();
        this.optionA = q.getOptionA();
        this.optionB = q.getOptionB();
        this.optionC = q.getOptionC();
        this.optionD = q.getOptionD();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getQuestionText() { return questionText; }
    public void setQuestionText(String questionText) { this.questionText = questionText; }

    public String getOptionA() { return optionA; }
    public void setOptionA(String optionA) { this.optionA = optionA; }

    public String getOptionB() { return optionB; }
    public void setOptionB(String optionB) { this.optionB = optionB; }

    public String getOptionC() { return optionC; }
    public void setOptionC(String optionC) { this.optionC = optionC; }

    public String getOptionD() { return optionD; }
    public void setOptionD(String optionD) { this.optionD = optionD; }
}
