package com.fintech.h4_02.service;

import com.fintech.h4_02.config.security.JwtService;
import com.fintech.h4_02.config.security.SecurityUserDetails;
import com.fintech.h4_02.dto.auth.AuthResponseDto;
import com.fintech.h4_02.dto.auth.LoginRequestDto;
import com.fintech.h4_02.dto.user.CreateUserRequestDto;
import com.fintech.h4_02.dto.user.UserResponseDto;
import com.fintech.h4_02.entity.Role;
import com.fintech.h4_02.entity.UserEntity;
import com.fintech.h4_02.exception.BadRequestException;
import com.fintech.h4_02.exception.EntityNotFoundException;
import com.fintech.h4_02.repository.RoleRepository;
import com.fintech.h4_02.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public AuthResponseDto login(LoginRequestDto dto) {
        try {
            var authentication = new UsernamePasswordAuthenticationToken(dto.email(), dto.password());
            authenticationManager.authenticate(authentication);
        } catch (Exception e) {
            throw new BadCredentialsException("Invalid username or password.");
        }
        Optional<UserEntity> userMaybe = userRepository.findByEmail(dto.email());
        if (userMaybe.isEmpty()) {
            throw new EntityNotFoundException(String.format("User not found with email: %s", dto.email()));
        }
        UserEntity user = userMaybe.get();
        String token = jwtService.createAuthToken(new SecurityUserDetails(user));
        return new AuthResponseDto(new UserResponseDto(user), token);
    }

    @Transactional
    public AuthResponseDto register(CreateUserRequestDto dto) {
        Optional<UserEntity> userMaybe = userRepository.findByEmail(dto.email());
        if (userMaybe.isPresent()) {
            throw new BadRequestException(String.format("Email is already registered: %s", dto.email()));
        }

        UserEntity newUser = new UserEntity();
        newUser.setEmail(dto.email());
        newUser.setPassword(passwordEncoder.encode(dto.password()));
        newUser.setName(dto.name());
        newUser.setDni(dto.dni());

        Optional<Role> rol = roleRepository.findById(1L);
        Set<Role> roles = Set.of(rol.get());
        newUser.setRoles(roles);


        UserEntity savedUser = userRepository.save(newUser);
        String token = jwtService.createAuthToken(new SecurityUserDetails(savedUser));
        return new AuthResponseDto(new UserResponseDto(savedUser), token);
    }

}
