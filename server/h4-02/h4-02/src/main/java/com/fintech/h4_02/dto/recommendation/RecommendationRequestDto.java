package com.fintech.h4_02.dto.recommendation;

import com.fintech.h4_02.entity.OnboardingEntity;
import com.fintech.h4_02.entity.goal.Goal;

import java.math.BigDecimal;
import java.util.List;

public record RecommendationRequestDto(
        String knowledgeLevel,

        List<String> goals,

        String riskPreference,

        BigDecimal monthlyIncome,

        BigDecimal monthlyExpenses,

        BigDecimal savingsPercentage
) {

    public RecommendationRequestDto(OnboardingEntity entity) {
        this(
                entity.getKnowledgeLevel().name(),
                entity.getGoals().stream().map(Goal::getName).toList(),
                entity.getRiskPreference().name(),
                entity.getMonthlyIncome(),
                entity.getMonthlyExpenses(),
                entity.getSavingsPercentage()
        );
    }

}
