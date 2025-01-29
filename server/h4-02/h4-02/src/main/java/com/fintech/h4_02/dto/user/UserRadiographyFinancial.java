package com.fintech.h4_02.dto.user;

import com.fintech.h4_02.dto.coin.CoinPrice;
import com.fintech.h4_02.dto.exchange.ExchangeSimple;
import com.fintech.h4_02.dto.goal.GoalResponseDto;
import lombok.Builder;

import java.math.BigDecimal;
import java.util.List;

@Builder
public record UserRadiographyFinancial(

        UserResponseDto user,
        List<GoalResponseDto> goal,
        BigDecimal ingresos,
        BigDecimal egresos,
        List<ExchangeSimple> coins,
        List<CoinPrice> priceBuycoins,
        List<CoinPrice> priceSellcoins,
        String machinelearning,
        BigDecimal total
) {

}
