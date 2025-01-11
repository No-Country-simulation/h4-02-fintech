package com.fintech.h4_02.dto.User;

import com.fintech.h4_02.entity.UserEntity;
import jakarta.validation.constraints.NotBlank;

public record UsercreatedResponse(

        Long id,

        String email,

        String password,

        String name,
        String dni
) {

    public UsercreatedResponse(UserEntity userCreated) {
        this(userCreated.getId(), userCreated.getEmail(), userCreated.getPassword(), userCreated.getName(), userCreated.getDni());
    }
}
