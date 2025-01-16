package com.fintech.h4_02.dto.auth;

import jakarta.validation.constraints.NotBlank;

public record PasswordResetRequestDto(
    @NotBlank
    String token,

    @NotBlank
    String password
) {

}