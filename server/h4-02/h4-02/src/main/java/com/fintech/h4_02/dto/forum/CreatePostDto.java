package com.fintech.h4_02.dto.forum;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreatePostDto(
        @NotBlank
        @Size.List({
                @Size(min = 5, message = "Content must be at least 5 characters long"),
                @Size(max = 500, message = "Up to 500 characters are permitted")
        })
        String content
) {
 
}
