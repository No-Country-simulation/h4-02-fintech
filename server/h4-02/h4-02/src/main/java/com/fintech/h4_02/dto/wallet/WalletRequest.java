package com.fintech.h4_02.dto.wallet;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record WalletRequest(
        @NotNull
        Long user,

        String description,

        @NotBlank
        String value,

        @NotBlank
        String state,

        @NotBlank
        String date
) {

    public WalletRequest(
            @NotNull
            Long user,

            String description,

            @NotBlank
            Double value,

            @NotBlank
            String state,

            @NotBlank
            String date
    ) {
        this(user, description, String.valueOf(value), state, date);
    }

}
