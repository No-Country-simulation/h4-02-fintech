package com.fintech.h4_02.dto.forum;

import jakarta.validation.constraints.NotBlank;

public record CreatePostDto(
        @NotBlank
        String content
) {

}
