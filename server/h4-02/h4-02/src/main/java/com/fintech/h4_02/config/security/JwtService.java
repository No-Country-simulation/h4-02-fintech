package com.fintech.h4_02.config.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Configuration
@Slf4j
public class JwtService {
    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration-hours}")
    private int jwtExpirationHours;

    public String createToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        var roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
        claims.put("roles", roles);
        return createToken(userDetails.getUsername(), claims);
    }

    public String createActivationToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("purpose", "account_activation");
        return createToken(username, claims);
    }

    public String createToken(String username, Map<String, Object> claims) {
        return Jwts.builder()
            .claims(claims)
            .subject(username)
            .issuedAt(new Date(System.currentTimeMillis()))
            .expiration(getTokenExpirationInHours())
            .signWith(getKey())
            .compact();
    }

    public boolean isActivationTokenValid(String token) {
        try {
            String purpose = getClaim(token, claims -> (String) claims.get("purpose"));
            return "account_activation".equals(purpose) && !isTokenExpired(token);
        } catch (Exception e) {
            log.error("Error trying to validate activation token: {}", e.getMessage());
            return false;
        }
    }

    public String getUsernameFromToken(String token) {
        return getClaim(token, Claims::getSubject);
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public Date getExpiration(String token) {
        return getClaim(token, Claims::getExpiration);
    }

    public boolean isTokenExpired(String token) {
        return getExpiration(token).before(new Date());
    }

    public <T> T getClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaims(String token) {
        try {
            return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
        } catch (Exception e) {
            log.error("Error while processing JWT: {}", e.getMessage());
            throw new RuntimeException("Error while processing JWT. Details:", e);
        }
    }

    private SecretKey getKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    private Date getTokenExpirationInHours() {
        return new Date(System.currentTimeMillis() + 1000L * 60 * 60 * jwtExpirationHours);
    }

}
