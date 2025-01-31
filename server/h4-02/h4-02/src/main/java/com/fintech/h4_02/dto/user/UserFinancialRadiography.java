package com.fintech.h4_02.dto.user;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record UserFinancialRadiography(
        FinancialRadiographyItem income,

        FinancialRadiographyItem savings,

        FinancialRadiographyItem fixedExpenses,

        FinancialRadiographyItem balance
) {

    @Builder
    public record FinancialRadiographyItem(
            ForeignExchangeValue values,

            @JsonInclude(JsonInclude.Include.NON_NULL)
            Double percentage
    ) {
    }

    public record ForeignExchangeValue(
            @JsonProperty("USD")
            BigDecimal usd,

            @JsonProperty("ARG")
            BigDecimal arg
    ) {
    }

}
