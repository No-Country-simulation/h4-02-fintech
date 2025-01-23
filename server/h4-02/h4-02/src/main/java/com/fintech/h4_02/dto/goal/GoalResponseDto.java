package com.fintech.h4_02.dto.goal;

import com.fintech.h4_02.entity.goal.Goal;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record GoalResponseDto(
        Long id,

        String goalName,

        String category,

        BigDecimal desiredAmount,

        Double progress,

        LocalDate deadline,

        List<GoalContributionDto> contributions
) {

    public GoalResponseDto(Goal goal) {
        this(
                goal.getId(),
                goal.getName(),
                goal.getCategory(),
                goal.getDesiredAmount(),
                goal.getProgress(),
                goal.getDeadline(),
                goal.getGoalContributions().stream().map(GoalContributionDto::new).toList()
        );
    }

}
