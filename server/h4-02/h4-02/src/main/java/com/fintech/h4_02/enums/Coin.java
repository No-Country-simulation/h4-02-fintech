package com.fintech.h4_02.enums;

public enum Coin {
    FOREX("forex"),
    ETF("etf"),
    COMMODITIES("commodities");


    private final String value;

    Coin(String value) {
        this.value = value;
    }
}
