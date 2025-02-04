package com.fintech.h4_02.dto.wallet;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ValueDatePairDto(
        BigDecimal value,

        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate date
) {

}
