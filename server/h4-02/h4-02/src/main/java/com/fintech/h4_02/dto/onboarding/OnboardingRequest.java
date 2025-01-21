package com.fintech.h4_02.dto.onboarding;

import jakarta.validation.constraints.Positive;

import java.util.List;

public record OnboardingRequest(
        Long userId,

        String knowledgeLevel,

        List<String> goals,

        String riskPreference,

        @Positive(message = "el monthlyIncome debe ser positivo ")
        String monthlyIncome,

        @Positive(message = "el monthlyExpenses debe ser positivo ")
        String monthlyExpenses,

        @Positive(message = "el savingsPercentage debe ser positivo ")
        String savingsPercentage
) {

}
