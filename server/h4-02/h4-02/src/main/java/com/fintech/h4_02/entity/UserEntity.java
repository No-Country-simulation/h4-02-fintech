package com.fintech.h4_02.entity;

import com.fintech.h4_02.dto.User.UserCreated;
import jakarta.persistence.*;
import lombok.*;


@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "UserEntity")
@Table(name = "User_entity")
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


    public UserEntity(UserCreated user){
        this.email = user.email();
        this.name = user.name();
        this.password = user.password();
        this.dni = user.dni();
    }


}
