package com.fintech.h4_02.dto.goal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDate;

public record CreateGoalDto(
        @NotBlank
        String goalName,

        @NotBlank
        String category,

        @Positive
        BigDecimal desiredAmount,

        @DateTimeFormat(pattern = "yyyy-MM-dd")
        LocalDate deadline
) {

}
