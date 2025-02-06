package com.fintech.h4_02.enums;

public enum QueriesState {
    QUERY("query"),
    ERROR("error");

    private final String value;

    QueriesState(String value) {
        this.value = value;
    }
    
}
