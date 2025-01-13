package com.fintech.h4_02.controller;

import com.fintech.h4_02.service.AuthService;
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
 * - Backend redirects to log in form
 */
@RestController
@RequestMapping("/api/v1/activation")
@RequiredArgsConstructor
public class AccountActivationController {
    private final AuthService authService;

    @Value("${frontend.url}")
    private String frontendUrl;

    @GetMapping("/confirm-account")
    public ResponseEntity<Void> activateAccount(@RequestParam("token") String token) {
        authService.activateAccount(token);
        return ResponseEntity.status(HttpStatus.FOUND).location(URI.create(frontendUrl + "/login")).build();
    }

}
