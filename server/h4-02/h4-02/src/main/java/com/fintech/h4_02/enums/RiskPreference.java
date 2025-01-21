package com.fintech.h4_02.enums;

public enum RiskPreference {
    BAJO("bajo"),
    MODERADO("moderado"),
    ALTO("alto");

    private final String value;

    RiskPreference(String dato) {
        this.value = dato;
    }
    
}
