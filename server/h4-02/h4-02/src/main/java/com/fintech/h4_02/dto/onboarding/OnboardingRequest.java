package com.fintech.h4_02.dto.onboarding;

import java.util.List;
import java.util.Set;

public record OnboardingRequest(
        String knowledgeLevel,
        List<String> goals,
        String riskPreference,
        Integer monthlyIncome,
        Integer monthlyExpenses,
        Integer savingsPercentage,
        Long userId
) {
}
