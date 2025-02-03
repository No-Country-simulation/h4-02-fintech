package com.fintech.h4_02.dto.feedback;

import com.fintech.h4_02.entity.UserFeedback;
import jakarta.validation.constraints.NotNull;

public record UserFeedbackRequest(
        @NotNull
        String title,

        @NotNull
        String content,

        @NotNull
        UserFeedback.FeedbackType feedbackType
) {

}