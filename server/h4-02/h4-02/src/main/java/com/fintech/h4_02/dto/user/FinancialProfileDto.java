package com.fintech.h4_02.dto.user;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public record FinancialProfileDto(
        @JsonProperty(value = "total_balance", access = JsonProperty.Access.READ_ONLY)
        UserFinancialRadiography.ForeignExchangeValue totalBalance,

        @JsonProperty(access = JsonProperty.Access.READ_ONLY)
        UserFinancialRadiography.ForeignExchangeValue savings,

        @JsonProperty(access = JsonProperty.Access.READ_ONLY)
        Long investments,

        @NotNull
        @JsonProperty("age_range")
        String ageRange,

        @NotNull
        @JsonProperty("evolution_tool")
        String evolutionTool,

        @NotNull
        String insurance
) {

}
