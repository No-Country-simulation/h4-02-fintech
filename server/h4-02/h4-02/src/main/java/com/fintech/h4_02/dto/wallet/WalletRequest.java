package com.fintech.h4_02.dto.wallet;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record WalletRequest(@NotNull
                            Long user,


                            String description,
                            @NotBlank
                            String value,

                            @NotBlank
                            String state) {
    public WalletRequest(Long user,


                         String description,

                         Double value,


                         String state) {
        this(user, description, String.valueOf(value), state);

    }
}
