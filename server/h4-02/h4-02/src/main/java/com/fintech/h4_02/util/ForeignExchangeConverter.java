package com.fintech.h4_02.util;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class ForeignExchangeConverter {
    public static double ARS_TO_USD_CONVERSION_RATE = 0.00095;

    public static BigDecimal convertToUsd(BigDecimal ars) {
        return ars.multiply(BigDecimal.valueOf(ARS_TO_USD_CONVERSION_RATE));
    }

    public static BigDecimal convertToArs(BigDecimal usd) {
        return usd.divide(BigDecimal.valueOf(ARS_TO_USD_CONVERSION_RATE), 2, RoundingMode.HALF_UP);
    }

}
