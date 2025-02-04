package com.fintech.h4_02.dto.user;

import com.fintech.h4_02.dto.wallet.ValueDatePairDto;

import java.util.List;

public record UserFinancialSummaryDto(
        List<ValueDatePairDto> income,

        List<ValueDatePairDto> expenses,

        List<ValueDatePairDto> savings
) {

}
