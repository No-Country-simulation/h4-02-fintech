package com.fintech.h4_02.entity;

import com.fintech.h4_02.dto.User.UserCreated;
import jakarta.persistence.*;
import lombok.*;



@Entity(name = "UserEntity")
@Table(name = "User_entity")
@EqualsAndHashCode(of = "id")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    @Column(name = "email",unique = true)
    private String email;

    public UserEntity() {
    }

    @Column(name = "password")
    private String password;

    @Column(name = "name")
    private String name;

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

    public String getDni() {
        return dni;
    }

    @Column(name = "dni",unique = true)
    private String dni;

    public UserEntity(long id, String email, String password, String name, String dni) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.dni = dni;
    }

    public UserEntity(UserCreated user){
        this.email = user.email();
        this.name = user.name();
        this.password = user.password();
        this.dni = user.dni();
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

}
