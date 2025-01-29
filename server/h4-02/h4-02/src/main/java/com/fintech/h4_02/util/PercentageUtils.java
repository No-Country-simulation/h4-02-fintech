package com.fintech.h4_02.util;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class PercentageUtils {

    public static double calculatePercentage(BigDecimal value, BigDecimal total) {
        if (total == null || total.compareTo(BigDecimal.ZERO) == 0) {
            return 0.0;
        }
        BigDecimal percentage = value.abs()
                .multiply(BigDecimal.valueOf(100))
                .divide(total, 2, RoundingMode.HALF_UP);
        return percentage.doubleValue();
    }

}
