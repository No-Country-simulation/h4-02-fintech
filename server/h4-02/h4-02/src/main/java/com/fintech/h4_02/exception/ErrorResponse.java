package com.fintech.h4_02.exception;

import lombok.Builder;

@Builder
public record ErrorResponse(String details, Integer statusCode, String message) {
    
}