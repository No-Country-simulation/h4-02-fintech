package com.fintech.h4_02.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "exchange_description")
@Getter
@Setter
public class ExchangeDescription {
    @Id
    @JsonProperty("symbol")
    private String symbol;

    @JsonProperty("name")
    private String name;

    @JsonProperty("exchange")
    private String exchange;

    @Column(name = "mic_code")
    @JsonProperty("mic_code")
    private String micCode;

    @JsonProperty("sector")
    private String sector;

    @JsonProperty("industry")
    private String industry;

    @JsonProperty("employees")
    private Integer employees;

    @JsonProperty("website")
    private String website;

    @JsonProperty("description")
    @Column(length = 2000)
    private String description;

    @JsonProperty("type")
    private String type;

    @JsonProperty("CEO")
    private String ceo;

    @JsonProperty("address")
    private String address;

    @JsonProperty("address2")
    @Column(name = "address_2")
    private String address2;

    @JsonProperty("city")
    private String city;

    @JsonProperty("zip")
    private String zip;

    @JsonProperty("state")
    private String state;

    @JsonProperty("country")
    private String country;

    @JsonProperty("phone")
    private String phone;

}
