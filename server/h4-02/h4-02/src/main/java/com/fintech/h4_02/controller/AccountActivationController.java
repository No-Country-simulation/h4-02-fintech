package com.fintech.h4_02.controller;

import com.fintech.h4_02.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

/**
 * Account confirmation flow:
 * - System sends an account confirmation email when the user registers a new account
 * - User clics on the link in the email
 * - Backend is called and account is activated using the token in the url
 * - Backend redirects to login form in the frontend
 */
@Tag(name = "Account Activation", description = "Endpoints for activating user accounts")
@RestController
@RequestMapping("/api/v1/activation")
@RequiredArgsConstructor
public class AccountActivationController {
    private final AuthService authService;

    @Value("${frontend.url}")
    private String frontendUrl;

    @Operation(
        summary = "Activate a user account",
        description = """
                 Activates a user account using a token sent to the user's email upon registration.\s
                 If the token is valid, the account is activated and the user is redirected to the login form in the frontend.
            \s""",
        responses = {
            @ApiResponse(responseCode = "302", description = "Account successfully activated, redirects to login form"),
        }
    )
    @GetMapping("/confirm-account")
    public ResponseEntity<Void> activateAccount(@RequestParam("token") String token) {
        authService.activateAccount(token);
        return ResponseEntity.status(HttpStatus.FOUND).location(URI.create(frontendUrl + "/dashboard")).build();
    }

}
