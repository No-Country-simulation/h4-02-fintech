package com.fintech.h4_02.dto.comment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CommentRequest(
        @NotNull
        Long queryId,
        @NotBlank
        String description,
        @NotNull
        Long userId
) {
}
