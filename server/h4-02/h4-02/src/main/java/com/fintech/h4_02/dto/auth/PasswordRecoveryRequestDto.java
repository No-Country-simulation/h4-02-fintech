package com.fintech.h4_02.dto.auth;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record PasswordRecoveryRequestDto(
    @NotBlank(message = "Email must not be blank")
    @Email(message = "Please provide a valid email address")
    String email
) {
    
}