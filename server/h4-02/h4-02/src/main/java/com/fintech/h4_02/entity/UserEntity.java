package com.fintech.h4_02.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fintech.h4_02.dto.user.CreateUserRequestDto;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "UserEntity")
@Table(name = "user_entity")
@EqualsAndHashCode(of = "id")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "name")
    private String name;

    @Column(name = "dni", unique = true)
    private String dni;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "onboarding_entity_id", referencedColumnName = "id")
    @JsonManagedReference
    private OnboardingEntity onboarding;

    @Column(name = "reset_password_token")
    private String resetPasswordToken;

    @Column(name = "reset_password_token_expiry")
    private LocalDateTime tokenExpirationDate;

    @Getter(AccessLevel.NONE)
    @Column(name = "is_email_confirmed")
    private Boolean isEmailConfirmed;

    @Column(name = "oauth_provider")
    @Enumerated(EnumType.STRING)
    private OAuthProvider provider;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<WalletEntity> wallets = new ArrayList<>();

    public UserEntity(CreateUserRequestDto user) {
        this.email = user.email();
        this.name = user.name();
        this.password = user.password();
        this.dni = user.dni();
    }

    public boolean isEmailConfirmed() {
        return Objects.requireNonNullElse(isEmailConfirmed, false);
    }

    public enum OAuthProvider {
        GOOGLE,
        APPLE,
        SYSTEM;

        public static OAuthProvider fromString(String value) {
            for (OAuthProvider provider : OAuthProvider.values()) {
                if (provider.name().equalsIgnoreCase(value)) {
                    return provider;
                }
            }
            throw new IllegalArgumentException("No enum constant for value: " + value);
        }

    }

}
