package com.fintech.h4_02.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "ExchangeEntity")
@Table(name = "exchange_entity")
@EqualsAndHashCode(of = "id")
public class ExchangeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private BigDecimal value;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    private String coin;

}
