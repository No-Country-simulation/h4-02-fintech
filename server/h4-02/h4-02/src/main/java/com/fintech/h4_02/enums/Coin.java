package com.fintech.h4_02.enums;

public enum Coin {
    EQUITY("equity"),
    ETF("etf"),
    FUND("fund"),
    BOND("bond"),
    CE("ce");

    private final String value;

    Coin(String value) {
        this.value = value;
    }
}
