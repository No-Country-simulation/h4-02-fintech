package com.fintech.h4_02.service.auth;

import com.fintech.h4_02.config.security.JwtService;
import com.fintech.h4_02.config.security.SecurityUserDetails;
import com.fintech.h4_02.dto.auth.AuthResponseDto;
import com.fintech.h4_02.dto.auth.LoginRequestDto;
import com.fintech.h4_02.dto.auth.OAuthLoginRequestDto;
import com.fintech.h4_02.dto.user.CreateUserRequestDto;
import com.fintech.h4_02.dto.user.UserResponseDto;
import com.fintech.h4_02.entity.Role;
import com.fintech.h4_02.entity.UserEntity;
import com.fintech.h4_02.exception.BadRequestException;
import com.fintech.h4_02.exception.EntityNotFoundException;
import com.fintech.h4_02.exception.InvalidTokenException;
import com.fintech.h4_02.repository.RoleRepository;
import com.fintech.h4_02.repository.UserRepository;
import com.fintech.h4_02.service.EmailService;
import com.fintech.h4_02.util.RandomString;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
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
    private final EmailService emailService;

    public AuthResponseDto systemLogin(LoginRequestDto dto) {
        UserEntity user = getUserByEmailOrThrow(dto.email());
        if (!user.getProvider().equals(UserEntity.OAuthProvider.SYSTEM)) {
            throw new IllegalStateException("User should use provider " + user.getProvider() + " to login");
        }

        var authentication = new UsernamePasswordAuthenticationToken(dto.email(), dto.password());
        authenticationManager.authenticate(authentication);
        String token = jwtService.createToken(new SecurityUserDetails(user));
        return new AuthResponseDto(new UserResponseDto(user), token);
    }

    private AuthResponseDto oauthLogin(LoginRequestDto dto, String pictureUrl) {
        UserEntity user = getUserByEmailOrThrow(dto.email());
        if (user.getProvider().equals(UserEntity.OAuthProvider.SYSTEM)) {
            throw new IllegalStateException("User should use system provider to login");
        }

        user.setPictureUrl(pictureUrl);

        String token = jwtService.createToken(new SecurityUserDetails(user));
        return new AuthResponseDto(new UserResponseDto(user), token);
    }

    @Transactional
    public AuthResponseDto systemRegister(CreateUserRequestDto dto) {
        throwIfUserAlreadyRegistered(dto.email());

        UserEntity newUser = new UserEntity();
        newUser.setEmail(dto.email());
        newUser.setPassword(passwordEncoder.encode(dto.password()));
        newUser.setName(dto.name());
        newUser.setDni(dto.dni());
        newUser.setPictureUrl(dto.pictureUrl());
        newUser.setProvider(UserEntity.OAuthProvider.SYSTEM);
        Optional<Role> rol = roleRepository.findById(1L);
        Set<Role> roles = Set.of(rol.get());
        newUser.setRoles(roles);

        // Save new user to database
        UserEntity savedUser = userRepository.save(newUser);
        String token = jwtService.createToken(new SecurityUserDetails(savedUser));

        // Send confirmation account email
        String confirmationAccountToken = jwtService.createActivationToken(newUser.getEmail());
        emailService.sendAccountConfirmationEmail(newUser.getEmail(), confirmationAccountToken);

        return new AuthResponseDto(new UserResponseDto(savedUser), token);
    }

    private AuthResponseDto oauthRegister(CreateUserRequestDto dto, UserEntity.OAuthProvider provider) {
        throwIfUserAlreadyRegistered(dto.email());

        UserEntity newUser = new UserEntity();
        newUser.setEmail(dto.email());
        newUser.setName(dto.name());
        newUser.setDni(dto.dni());
        newUser.setPictureUrl(dto.pictureUrl());
        newUser.setProvider(provider);
        Optional<Role> rol = roleRepository.findById(1L);
        Set<Role> roles = Set.of(rol.get());
        newUser.setRoles(roles);
        newUser.setIsEmailConfirmed(true);

        // Save new user to database
        UserEntity savedUser = userRepository.save(newUser);
        String token = jwtService.createToken(new SecurityUserDetails(savedUser));

        return new AuthResponseDto(new UserResponseDto(savedUser), token);
    }

    @Transactional
    public AuthResponseDto loginOrRegisterWithOAuth(OAuthLoginRequestDto dto, String provider) {
        UserEntity.OAuthProvider oauthProvider = UserEntity.OAuthProvider.fromString(provider);
        if (oauthProvider.equals(UserEntity.OAuthProvider.SYSTEM)) {
            throw new IllegalArgumentException("Unsupported OAuth provider: " + provider);
        }

        // Verify ID token
        // auth0IdTokenVerifierService.verifyAuth0IdToken(dto.idToken());

        // Login or register user
        boolean userExists = userRepository.existsByEmail(dto.email());
        if (userExists) {
            var loginRequestDto = new LoginRequestDto(dto.email(), null);
            return oauthLogin(loginRequestDto, dto.picture());
        } else {
            var createUserRequestDto = CreateUserRequestDto.builder()
                    .name(dto.name())
                    .email(dto.email())
                    .pictureUrl(dto.picture())
                    .build();
            return oauthRegister(createUserRequestDto, oauthProvider);
        }
    }

    public UserEntity getUserByResetPasswordToken(String resetPasswordToken) {
        if (resetPasswordToken == null || resetPasswordToken.isEmpty()) {
            throw new IllegalArgumentException("Reset password token is not present");
        }
        return userRepository
                .findByResetPasswordToken(resetPasswordToken)
                .orElseThrow(() -> new EntityNotFoundException(String.format("User not found with token: %s", resetPasswordToken)));
    }

    @Transactional
    public String updatePasswordRecoveryToken(String email) {
        String token = RandomString.generateRandomString(45);
        UserEntity user = getUserByEmailOrThrow(email);

        user.setResetPasswordToken(token);
        user.setTokenExpirationDate(LocalDateTime.now().plusMinutes(30));
        userRepository.save(user);

        return token;
    }

    public void throwIfPasswordResetTokenIsExpired(String resetPasswordToken) {
        if (resetPasswordToken == null || resetPasswordToken.trim().isEmpty()) {
            throw new IllegalArgumentException("Reset password token is not present");
        }
        UserEntity user = userRepository
                .findByResetPasswordToken(resetPasswordToken)
                .orElseThrow(() -> new EntityNotFoundException("User not found with token: " + resetPasswordToken));

        boolean isTokenExpired = user.getTokenExpirationDate() != null && user.getTokenExpirationDate().isBefore(LocalDateTime.now());
        if (isTokenExpired) {
            throw new InvalidTokenException("Password reset token is expired!");
        }
    }

    @Transactional
    public void updateUserPassword(String token, String newPassword) {
        throwIfPasswordResetTokenIsExpired(token);

        UserEntity user = getUserByResetPasswordToken(token);
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetPasswordToken(null);

        userRepository.save(user);
    }

    @Transactional
    public void activateAccount(String token) {
        boolean isTokenValid = jwtService.isActivationTokenValid(token);
        if (!isTokenValid) {
            throw new InvalidTokenException("Invalid or expired activation token");
        }

        // Check if the user exists
        String username = jwtService.getUsernameFromToken(token);
        UserEntity user = getUserByEmailOrThrow(username);

        // Throw if the user is already activated
        if (Boolean.TRUE.equals(user.isEmailConfirmed())) {
            throw new IllegalStateException("The account is already activated: " + username);
        }

        user.setIsEmailConfirmed(true);
        userRepository.save(user);
    }

    private UserEntity getUserByEmailOrThrow(String email) {
        Optional<UserEntity> userMaybe = userRepository.findByEmail(email);
        if (userMaybe.isEmpty()) {
            throw new EntityNotFoundException(String.format("User not found with email: %s", email));
        }
        return userMaybe.get();
    }

    private void throwIfUserAlreadyRegistered(String email) {
        Optional<UserEntity> userMaybe = userRepository.findByEmail(email);
        if (userMaybe.isPresent()) {
            throw new BadRequestException(String.format("Email is already registered: %s", email));
        }
    }

}
