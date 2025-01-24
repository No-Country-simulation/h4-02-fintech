package com.fintech.h4_02.dto.coin;

import com.fasterxml.jackson.annotation.JsonProperty;

public record CoinDtoRequest(
        @JsonProperty("symbol") String symbol
) {
}
