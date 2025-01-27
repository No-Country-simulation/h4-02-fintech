package com.fintech.h4_02.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fintech.h4_02.enums.State;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDate;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "ExchangeEntity")
@Table(name = "exchange_entity")
@EqualsAndHashCode(of = "id")
public class ExchangeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @Column(name = "value")
    private BigDecimal value;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "date")
    private LocalDate date;
    @Column(name = "coin")
    private String coin;
    @ManyToOne
    @JoinColumn(name = "user_entity_id", referencedColumnName = "id")
    @JsonIgnore
    private UserEntity user;
    @Enumerated(EnumType.STRING)
    private State state;
    @Column(name = "cuantity")
    private int cuantity;
    @Column(name = "total")
    private BigDecimal total;

}
