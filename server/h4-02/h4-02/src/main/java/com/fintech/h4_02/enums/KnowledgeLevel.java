package com.fintech.h4_02.enums;

public enum KnowledgeLevel {
    PRINCIPIANTE("principiante"),
    INTERMEDIO("intermedio");

   private final String  value;

    KnowledgeLevel(String dato) {
        this.value = dato;
    }
}
