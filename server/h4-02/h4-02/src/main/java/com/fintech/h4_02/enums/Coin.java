package com.fintech.h4_02.enums;

public enum Coin {
    FOREX("forex"),
    ETFS("etfs"),
    COMMODITIES("commodities");


    private final String value;

    Coin(String value) {
        this.value = value;
    }
}
