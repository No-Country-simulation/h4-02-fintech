package com.fintech.h4_02.dto.exchange;

import com.fintech.h4_02.dto.user.UserResponseDto;
import com.fintech.h4_02.entity.ExchangeEntity;
import com.fintech.h4_02.enums.State;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ExchangeResponse(
        Long id,
        String coin,
        BigDecimal value,
        String date,
        State state,
        UserResponseDto user

) {
    public ExchangeResponse(ExchangeEntity exchangeDb) {
        this(exchangeDb.getId(),exchangeDb.getCoin(),exchangeDb.getValue(), String.valueOf(exchangeDb.getDate()),exchangeDb.getState(),new UserResponseDto(exchangeDb.getUser()));
    }
}
