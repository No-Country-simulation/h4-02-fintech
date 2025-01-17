package com.fintech.h4_02.service.auth;

import com.nimbusds.jose.JWSObject;
import com.nimbusds.jose.crypto.RSASSAVerifier;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.Builder;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URL;
import java.text.ParseException;

@Service
public class AppleIdTokenVerifierService {
    private static final String APPLE_PUBLIC_KEYS_URL = "https://appleid.apple.com/auth/keys";
    private static final String ISSUER = "https://appleid.apple.com";

    @Value("${frontend.appleClientId}")
    private String frontendAppleClientId;

    public VerifiedAppleUser verifyAppleIdToken(String idTokenString) {
        return tryVerifyAppleIdToken(idTokenString);
    }

    private VerifiedAppleUser tryVerifyAppleIdToken(String idTokenString) {
        try {
            // Download public keys from Apple
            JWKSet jwkSet = JWKSet.load(new URL(APPLE_PUBLIC_KEYS_URL));

            // Decode signed token
            SignedJWT signedJWT = SignedJWT.parse(idTokenString);
            JWSObject jwsObject = JWSObject.parse(idTokenString);

            // Get key needed to check for id token signature
            String keyId = jwsObject.getHeader().getKeyID();
            RSAKey rsaKey = (RSAKey) jwkSet.getKeyByKeyId(keyId);
            if (rsaKey == null) {
                throw new IllegalArgumentException("Public key not found.");
            }

            // Check signature
            boolean signatureValid = signedJWT.verify(new RSASSAVerifier(rsaKey));
            if (!signatureValid) {
                throw new IllegalArgumentException("Invalid token signature.");
            }

            JWTClaimsSet claims = getJwtClaimsSet(signedJWT);
            return VerifiedAppleUser.builder()
                    .sub(claims.getSubject())
                    .email((String) claims.getClaim("email"))
                    .build();
        } catch (Exception e) {
            throw new IllegalArgumentException("Failed to verify Apple ID token: " + e.getMessage());
        }
    }

    private JWTClaimsSet getJwtClaimsSet(SignedJWT signedJWT) throws ParseException {
        JWTClaimsSet claims = signedJWT.getJWTClaimsSet();
        // Check issuer and aud claims
        if (!ISSUER.equals(claims.getIssuer())) {
            throw new IllegalArgumentException("Invalid issuer.");
        }
        if (!frontendAppleClientId.equals(claims.getAudience().get(0))) {
            throw new IllegalArgumentException("Invalid aud.");
        }
        // Check expiration
        if (claims.getExpirationTime() == null || claims.getExpirationTime().before(new java.util.Date())) {
            throw new IllegalArgumentException("token has expired.");
        }
        return claims;
    }

    @Builder
    @Getter
    public static class VerifiedAppleUser {
        private String sub;
        private String email;
    }

}
