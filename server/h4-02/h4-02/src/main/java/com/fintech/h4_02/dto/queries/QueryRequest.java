package com.fintech.h4_02.dto.queries;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record QueryRequest(
        @NotNull
        Long userId,
        @NotBlank
        String comment

) {
}
