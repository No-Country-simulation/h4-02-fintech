package com.fintech.h4_02.entity;

import com.fintech.h4_02.dto.user.CreateUserRequestDto;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "UserEntity")
@Table(name = "User_entity")
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


    @OneToOne(cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "onboarding_id", referencedColumnName = "id")
    private OnboardingEntity onboarding;


    public UserEntity(CreateUserRequestDto user) {
        this.email = user.email();
        this.name = user.name();
        this.password = user.password();
        this.dni = user.dni();
    }

}
