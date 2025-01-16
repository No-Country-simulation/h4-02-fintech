package com.fintech.h4_02.dto.onboarding;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

public record OnboardingRequest(
        String knowledgeLevel,
        List<String> goals,
        String riskPreference,
        String monthlyIncome,
        String monthlyExpenses,
        String savingsPercentage,
        Long userId
) {
}
