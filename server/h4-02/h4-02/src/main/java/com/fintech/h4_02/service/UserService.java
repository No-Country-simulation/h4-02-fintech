package com.fintech.h4_02.service;

import com.fintech.h4_02.dto.user.CreateUserRequestDto;
import com.fintech.h4_02.dto.user.UserResponseDto;
import com.fintech.h4_02.entity.Role;
import com.fintech.h4_02.entity.UserEntity;
import com.fintech.h4_02.exception.EntityNotFoundException;
import com.fintech.h4_02.repository.UserRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;


    public UserEntity getUserByEmail(String email) {
        return userRepository
            .findByEmail(email)
            .orElseThrow(() -> new EntityNotFoundException("User not found with email: " + email));
    }

    public UserResponseDto getUserById(@Valid @NotNull Long id) {
        UserEntity user = userRepository.findById(id).orElseThrow( ()-> new EntityNotFoundException("user not found"));
        return new UserResponseDto(user);
    }
}
