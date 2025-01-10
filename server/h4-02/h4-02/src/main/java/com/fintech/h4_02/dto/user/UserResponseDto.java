package com.fintech.h4_02.dto.user;

import com.fintech.h4_02.entity.UserEntity;

public record UserResponseDto(
        Long id,

        String email,

        String name
) {

    public UserResponseDto(UserEntity user) {
        this(user.getId(), user.getEmail(), user.getName());
    }

}
