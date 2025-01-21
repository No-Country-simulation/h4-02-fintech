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
import java.util.Date;

@Service
public class Auth0IdTokenVerifierService {
    @Value("${auth0.publicKeysUri}")
    private String auth0PublicKeysUri;

    @Value("${auth0.clientId}")
    private String auth0ClientId;

    public VerifiedAuth0User verifyAuth0IdToken(String idTokenString) {
        return tryVerifyAuth0IdToken(idTokenString);
    }

    private VerifiedAuth0User tryVerifyAuth0IdToken(String idTokenString) {
        try {
            // Download public keys from Apple
            JWKSet jwkSet = JWKSet.load(new URL(auth0PublicKeysUri));

            // Decode signed token
            SignedJWT signedJwt = SignedJWT.parse(idTokenString);
            JWSObject jwsObject = JWSObject.parse(idTokenString);

            // Get key needed to check for id token signature
            String keyId = jwsObject.getHeader().getKeyID();
            RSAKey rsaKey = (RSAKey) jwkSet.getKeyByKeyId(keyId);
            if (rsaKey == null) {
                throw new IllegalArgumentException("Public key not found.");
            }

            // Check signature
            boolean signatureValid = signedJwt.verify(new RSASSAVerifier(rsaKey));
            if (!signatureValid) {
                throw new IllegalArgumentException("Invalid token signature.");
            }

            JWTClaimsSet claims = getJwtClaimsSet(signedJwt);
            return VerifiedAuth0User.builder()
                    .sub(claims.getSubject())
                    .email((String) claims.getClaim("email"))
                    .build();
        } catch (Exception e) {
            throw new IllegalArgumentException("Failed to verify Apple ID token: " + e.getMessage());
        }
    }

    private JWTClaimsSet getJwtClaimsSet(SignedJWT signedJwt) throws ParseException {
        JWTClaimsSet claims = signedJwt.getJWTClaimsSet();
        if (!auth0ClientId.equals(claims.getAudience().get(0))) {
            throw new IllegalArgumentException("Invalid aud.");
        }
        // Check expiration
        if (claims.getExpirationTime() == null || claims.getExpirationTime().before(new Date())) {
            throw new IllegalArgumentException("Token has expired.");
        }
        return claims;
    }

    @Builder
    @Getter
    public static class VerifiedAuth0User {
        private String sub;
        private String email;
    }

}
