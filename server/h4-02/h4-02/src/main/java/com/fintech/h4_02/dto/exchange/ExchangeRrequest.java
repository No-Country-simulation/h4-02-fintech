package com.fintech.h4_02.dto.exchange;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record ExchangeRrequest(
        @NotNull
        Long userId,
        @NotBlank
        @Positive
        String value,
        @NotBlank
        String coin,
        @NotNull
        int cuantity
        ) {
    public ExchangeRrequest(@NotNull
                            Long userId,
                            @NotBlank
                            @Positive
                            Double value,
                            @NotBlank
                            String coin,
                            @NotBlank
                            int cuantity) {

        this(userId, String.valueOf(value), coin,cuantity);
    }


}
