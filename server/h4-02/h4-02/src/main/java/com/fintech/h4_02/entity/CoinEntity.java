package com.fintech.h4_02.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "CoinEntity")
@Table(name = "coin_entity")
@EqualsAndHashCode(of = "id")
public class CoinEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String symbol;
    private String instrumentName;
    private String exchange;
    private String micCode;
    private String exchangeTimezone;
    private String instrumentType;
    private String country;
    private String currency;

}
