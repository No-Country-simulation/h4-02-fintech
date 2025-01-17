package com.fintech.h4_02.dto.user;

import com.fintech.h4_02.entity.OnboardingEntity;
import com.fintech.h4_02.entity.Role;
import com.fintech.h4_02.entity.UserEntity;

import java.util.Set;

public record UserResponseDto(
        Long id,

        String email,

        String name,
        Set<Role> roles,
        OnboardingEntity onboarding
) {

    public UserResponseDto(UserEntity user) {
        this(user.getId(), user.getEmail(), user.getName(),user.getRoles(),user.getOnboarding() );
    }

}
