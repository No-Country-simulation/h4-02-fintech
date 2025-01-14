package com.fintech.h4_02.dto.user;

import jakarta.validation.constraints.NotBlank;

public record CreateUserRequestDto(
    @NotBlank
    String email,

    @NotBlank
    String password,

    @NotBlank
    String name,

    @NotBlank
    String dni
) {

}
