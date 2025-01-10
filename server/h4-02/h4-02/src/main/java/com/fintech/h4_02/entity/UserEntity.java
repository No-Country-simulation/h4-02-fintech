package com.fintech.h4_02.entity;

import com.fintech.h4_02.dto.User.UserCreated;
import jakarta.persistence.*;
import lombok.*;

@Entity(name = "UserEntity")
@Table(name = "User_entity")
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    @Column(name = "email",unique = true)
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "name")
    private String name;

    @Column(name = "dni",unique = true)
    private String dni;

    public String getDni() {
        return dni;
    }

    public UserEntity(UserCreated user){
        this.email = user.email();
        this.name = user.name();
        this.password = user.password();
    }

    public long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getName() {
        return name;
    }
}
