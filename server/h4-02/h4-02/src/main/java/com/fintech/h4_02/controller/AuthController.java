package com.fintech.h4_02.controller;

import com.fintech.h4_02.dto.auth.AuthResponseDto;
import com.fintech.h4_02.dto.auth.LoginRequestDto;
import com.fintech.h4_02.dto.auth.OAuthLoginRequestDto;
import com.fintech.h4_02.dto.user.CreateUserRequestDto;
import com.fintech.h4_02.service.auth.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "User authentication")
public class AuthController {
    private final AuthService authService;

    @Operation(summary = "Login User")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "User logged successfully",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = AuthResponseDto.class)
                    ))
    })
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@Valid @RequestBody LoginRequestDto dto) {
        return ResponseEntity.ok().body(authService.systemLogin(dto));
    }

    @Operation(summary = "Register a User", description = "Register a new UserEntity")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "User registered successfully",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = AuthResponseDto.class)
                    ))
    })
    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register(@RequestBody @Valid CreateUserRequestDto user) {
        AuthResponseDto response = authService.systemRegister(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/oauth")
    public ResponseEntity<AuthResponseDto> loginOrRegisterWithOAuth(@Valid @RequestBody OAuthLoginRequestDto dto, @RequestParam String provider) {
        return ResponseEntity.ok().body(authService.loginOrRegisterWithOAuth(dto, provider));
    }

}
