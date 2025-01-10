package com.fintech.h4_02.service;

import com.fintech.h4_02.dto.user.CreateUserRequestDto;
import com.fintech.h4_02.dto.user.UserResponseDto;
import com.fintech.h4_02.entity.UserEntity;
import com.fintech.h4_02.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserResponseDto createUser(CreateUserRequestDto user) {
        UserEntity userCreated = userRepository.save(new UserEntity(user));
        return new UserResponseDto(userCreated);
    }

}
