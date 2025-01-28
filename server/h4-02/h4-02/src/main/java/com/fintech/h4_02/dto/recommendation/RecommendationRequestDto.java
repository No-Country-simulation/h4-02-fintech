package com.fintech.h4_02.dto.recommendation;

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

}
