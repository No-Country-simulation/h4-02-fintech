package com.fintech.h4_02.dto.user;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record CreateUserRequestDto(
        @NotBlank
        String email,

        @NotBlank
        String password,

        @NotBlank
        String name,

        @NotBlank
        String dni,

        String pictureUrl
) {

    public CreateUserRequestDto(String email, String password, String name, String dni) {
        this(email, password, name, dni, null);
    }

}
