package com.fintech.h4_02.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fintech.h4_02.enums.StateWallet;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;

import java.math.BigDecimal;
import java.util.Date;

@Builder
@Getter
@Entity(name = "WalletEntity")
@Table(name = "waller_entity")
@EqualsAndHashCode(of = "id")
@AllArgsConstructor
@NoArgsConstructor
public class WalletEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "user_entity_id", referencedColumnName = "id")
    @JsonIgnore
    private UserEntity user;

    @Column(name = "description")
    private String description;
    @Column(name = "value")
    private BigDecimal value;

    @Enumerated(EnumType.STRING)
    private StateWallet state;
    @Column(name = "date")
    private Date date;
}
