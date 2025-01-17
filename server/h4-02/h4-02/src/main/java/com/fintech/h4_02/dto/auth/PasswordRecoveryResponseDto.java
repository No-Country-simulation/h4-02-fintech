package com.fintech.h4_02.dto.auth;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"message", "token"})
@JsonInclude(JsonInclude.Include.NON_NULL)
public record PasswordRecoveryResponseDto(String message, String token) {

    public PasswordRecoveryResponseDto(String message) {
        this(message, null);
    }

}
