package com.fintech.h4_02.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fintech.h4_02.enums.StateWallet;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDate;

@Builder
@Getter
@Setter
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

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "date")
    private LocalDate date;
}
