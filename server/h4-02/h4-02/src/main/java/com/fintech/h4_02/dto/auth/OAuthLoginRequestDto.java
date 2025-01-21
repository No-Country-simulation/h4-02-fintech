package com.fintech.h4_02.dto.auth;

import com.fasterxml.jackson.annotation.JsonProperty;

public record OAuthLoginRequestDto(
        @JsonProperty("id_token")
        String idToken,

        String sub,

        String name,

        String email,

        @JsonProperty("email_verified")
        String emailVerified,

        String picture,

        String locale,

        @JsonProperty("updated_at")
        String updatedAt
) {

}
