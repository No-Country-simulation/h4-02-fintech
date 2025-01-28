package com.fintech.h4_02.dto.exchange;

import com.fintech.h4_02.dto.user.UserResponseSimple;
import com.fintech.h4_02.entity.ExchangeEntity;
import com.fintech.h4_02.enums.State;

import java.math.BigDecimal;

public record ExchangeResponse(
        Long id,
        String coin,
        BigDecimal value,
        String date,
        State state,
        UserResponseSimple user,
        int quantity,
        BigDecimal total

) {
    public ExchangeResponse(ExchangeEntity exchangeDb) {
        this(exchangeDb.getId(),exchangeDb.getCoin(),exchangeDb.getValue(),
                String.valueOf(exchangeDb.getDate()),exchangeDb.getState(),
                new UserResponseSimple(exchangeDb.getUser()), exchangeDb.getQuantity(),
                exchangeDb.getTotal());
    }
}
