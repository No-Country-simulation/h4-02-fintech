package com.fintech.h4_02.dto.feedback;

import com.fintech.h4_02.entity.UserFeedback;

import java.time.LocalDateTime;

public record UserFeedbackResponse(
        Long id,

        String title,

        String content,

        UserFeedback.FeedbackType feedbackType,

        LocalDateTime createdAt
) {

    public UserFeedbackResponse(UserFeedback feedback) {
        this(
                feedback.getId(),
                feedback.getTitle(),
                feedback.getContent(),
                feedback.getFeedbackType(),
                feedback.getCreatedAt()
        );
    }

}
