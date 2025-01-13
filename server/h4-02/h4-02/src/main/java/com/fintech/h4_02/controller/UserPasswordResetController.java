package com.fintech.h4_02.controller;

import com.fintech.h4_02.dto.auth.PasswordRecoveryRequestDto;
import com.fintech.h4_02.dto.auth.PasswordRecoveryResponseDto;
import com.fintech.h4_02.dto.auth.PasswordResetRequestDto;
import com.fintech.h4_02.service.AuthService;
import com.fintech.h4_02.service.EmailService;
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
 * - The user insert new password
 * - Frontend calls "/reset-password" endpoint with the token and the new password
 * - If the response is successful redirect to dashboard; show error otherwise
 */
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class UserPasswordResetController {
    private final EmailService emailService;
    private final AuthService authService;

    @Value("${frontend.url}")
    private String frontendUrl;

    @PostMapping("/forgot-password")
    public ResponseEntity<PasswordRecoveryResponseDto> requestPasswordReset(@Valid @RequestBody PasswordRecoveryRequestDto request) {
        String token = authService.updatePasswordRecoveryToken(request.email());
        String resetPasswordLink = String.format("%s/reset-password?token=%s", frontendUrl, token);
        emailService.sendPasswordRecoveryEmail(request.email(), resetPasswordLink);
        return ResponseEntity.ok(new PasswordRecoveryResponseDto("Password reset email sent."));
    }

    @GetMapping("/reset-password/check-token-expiration")
    public ResponseEntity<Void> validateResetToken(@RequestParam(value = "token") String token) {
        authService.throwIfPasswordResetTokenIsExpired(token);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/reset-password")
    public ResponseEntity<PasswordRecoveryResponseDto> resetPassword(@Valid @RequestBody PasswordResetRequestDto request) {
        authService.updateUserPassword(request.token(), request.password());
        return ResponseEntity.ok(new PasswordRecoveryResponseDto("Password successfully reset."));
    }

}
