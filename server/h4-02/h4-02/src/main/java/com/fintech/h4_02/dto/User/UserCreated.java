package com.fintech.h4_02.dto.User;

import jakarta.validation.constraints.NotBlank;

public record UserCreated(
        @NotBlank
        String email,
        @NotBlank
        String password,
        @NotBlank
        String name
) {
}
