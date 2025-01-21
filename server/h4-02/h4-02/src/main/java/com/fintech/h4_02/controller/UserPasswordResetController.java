package com.fintech.h4_02.controller;

import com.fintech.h4_02.dto.auth.PasswordRecoveryRequestDto;
import com.fintech.h4_02.dto.auth.PasswordRecoveryResponseDto;
import com.fintech.h4_02.dto.auth.PasswordResetRequestDto;
import com.fintech.h4_02.service.EmailService;
import com.fintech.h4_02.service.auth.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Password reset flow:
 * - The user clics "Forgot password"
 * - Frontend calls "/forgot-password" endpoint with the user's email
 * - Backend generates and saves password reset token and sends reset email
 * - The user clics a link in the received email
 * - The link redirects to the frontend
 * - Frontend call "/reset-password/check-token-expiration" endpoint to check is the token has expired
 * - Frontend shows reset password form
 * - The user inserts new password and clics "Reset password"
 * - Frontend calls "/reset-password" endpoint with the token and the new password
 * - If the response is successful redirect to dashboard; show error otherwise
 */
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Tag(name = "Password Recovery", description = "Endpoints for password recovery flow")
public class UserPasswordResetController {
    private final EmailService emailService;
    private final AuthService authService;

    @Value("${frontend.url}")
    private String frontendUrl;

    @Operation(
            summary = "Request a password reset email",
            description = "Generates a password reset token and sends an email to the user with a link to reset their password.",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    required = true,
                    description = "Email of the user requesting password reset",
                    content = @Content(schema = @Schema(implementation = PasswordRecoveryRequestDto.class))
            ),
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Password reset email sent",
                            content = @Content(schema = @Schema(implementation = PasswordRecoveryResponseDto.class))),
            }
    )
    @PostMapping("/forgot-password")
    public ResponseEntity<PasswordRecoveryResponseDto> requestPasswordReset(@Valid @RequestBody PasswordRecoveryRequestDto request) {
        String token = authService.updatePasswordRecoveryToken(request.email());
        String resetPasswordLink = String.format("%s/reset-password?token=%s", frontendUrl, token);
        emailService.sendPasswordRecoveryEmail(request.email(), resetPasswordLink);
        return ResponseEntity.ok(new PasswordRecoveryResponseDto("Password reset email sent."));
    }

    @Operation(
            summary = "Validate reset token",
            description = "Checks if a password reset token is still valid or has expired.",
            responses = {@ApiResponse(responseCode = "200", description = "Token is valid")}
    )
    @PostMapping("/check-reset-password-token-expiration")
    public ResponseEntity<Void> validateResetToken(@RequestParam(value = "token") String token) {
        authService.throwIfPasswordResetTokenIsExpired(token);
        return ResponseEntity.ok().build();
    }

    @Operation(
            summary = "Reset password",
            description = "Updates the user's password using a valid reset token.",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    required = true,
                    description = "Token and new password for the user",
                    content = @Content(schema = @Schema(implementation = PasswordResetRequestDto.class))
            ),
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Password successfully reset",
                            content = @Content(schema = @Schema(implementation = PasswordRecoveryResponseDto.class))),
            }
    )
    @PostMapping("/reset-password")
    public ResponseEntity<PasswordRecoveryResponseDto> resetPassword(@Valid @RequestBody PasswordResetRequestDto request) {
        authService.updateUserPassword(request.token(), request.password());
        return ResponseEntity.ok(new PasswordRecoveryResponseDto("Password successfully reset."));
    }

}
