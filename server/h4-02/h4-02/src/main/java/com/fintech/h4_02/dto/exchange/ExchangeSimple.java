package com.fintech.h4_02.dto.exchange;

import java.math.BigDecimal;

public record ExchangeSimple(
        String name,
        BigDecimal total
) {
    public ExchangeSimple(String name,
                          String total) {
        this(name, new BigDecimal(total));

    }
}
