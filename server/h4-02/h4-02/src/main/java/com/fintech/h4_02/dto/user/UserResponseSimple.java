package com.fintech.h4_02.dto.user;

import com.fintech.h4_02.entity.UserEntity;

public record UserResponseSimple(
        Long id,
        String name
) {
    public UserResponseSimple(UserEntity user) {
        this(user.getId(), user.getName());
    }
}
