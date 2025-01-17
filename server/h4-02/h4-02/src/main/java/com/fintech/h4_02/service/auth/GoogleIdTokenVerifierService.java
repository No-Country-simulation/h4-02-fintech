package com.fintech.h4_02.service.auth;

import com.fintech.h4_02.exception.InvalidTokenException;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import lombok.Builder;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Service
public class GoogleIdTokenVerifierService {
    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();

    @Value("${frontend.googleClientId}")
    private String frontendGoogleClientId;

    public VerifiedGoogleUser verifyGoogleIdToken(String idTokenString) {
        return tryVerifyGoogleIdToken(idTokenString);
    }

    private VerifiedGoogleUser tryVerifyGoogleIdToken(String idTokenString) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(GoogleNetHttpTransport.newTrustedTransport(), JSON_FACTORY)
                    .setAudience(Collections.singletonList(frontendGoogleClientId))
                    .build();
            // Verifies the JWT signature, the aud claim, the iss claim, and the exp claim.
            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                String email = payload.getEmail();
                boolean emailVerified = payload.getEmailVerified();
                String name = (String) payload.get("name");
                String pictureUrl = (String) payload.get("picture");
                String locale = (String) payload.get("locale");
                String familyName = (String) payload.get("family_name");
                String givenName = (String) payload.get("given_name");
                return VerifiedGoogleUser.builder()
                        .email(email)
                        .emailVerified(emailVerified)
                        .name(name)
                        .pictureUrl(pictureUrl)
                        .locale(locale)
                        .familyName(familyName)
                        .givenName(givenName)
                        .build();
            } else {
                throw new InvalidTokenException("Invalid Google ID token.");
            }
        } catch (GeneralSecurityException | IOException e) {
            throw new InvalidTokenException("Failed to verify Google ID token: " + e.getMessage());
        }
    }

    @Builder
    @Getter
    public static class VerifiedGoogleUser {
        private String userId;
        private String email;
        private boolean emailVerified;
        private String name;
        private String pictureUrl;
        private String locale;
        private String familyName;
        private String givenName;
    }

}
