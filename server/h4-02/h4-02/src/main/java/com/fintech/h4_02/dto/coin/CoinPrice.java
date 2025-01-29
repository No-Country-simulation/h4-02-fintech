package com.fintech.h4_02.dto.coin;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record CoinPrice(
        @NotBlank(message = "el nombre no debe ser nulo")
        String Name,
        @NotNull(message = "el price no debe ser nulo")
        BigDecimal price
) {
        public CoinPrice( String coin, Double averageQuantity){
                this(coin,new BigDecimal(averageQuantity));
        }
}
