package com.fintech.h4_02.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequestDto(
        @Email(message = "invalid email entered")
        @NotBlank(message = "Email must be required")
        String email,

        @NotBlank(message = "Password cannot be empty")
        String password
) {
}
