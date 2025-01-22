package com.fintech.h4_02.dto.goal;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fintech.h4_02.entity.goal.GoalContribution;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

public record GoalContributionDto(
        @JsonProperty(access = JsonProperty.Access.READ_ONLY)
        Long id,

        @NotNull
        BigDecimal amount,

        @JsonProperty(access = JsonProperty.Access.READ_ONLY)
        LocalDate date
) {

    public GoalContributionDto(GoalContribution contribution) {
        this(contribution.getId(), contribution.getAmount(), contribution.getDate());
    }

}
