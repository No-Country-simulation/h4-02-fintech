package com.fintech.h4_02.dto.coin;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;

public record CoinDto(
        @JsonProperty("symbol") String symbol,
        @JsonProperty("instrument_name") String instrumentName,
        @JsonProperty("exchange") String exchange,
        @JsonProperty("mic_code") String micCode,
        @JsonProperty("exchange_timezone") String exchangeTimezone,
        @JsonProperty("instrument_type") String instrumentType,
        @JsonProperty("country") String country,
        @JsonProperty("currency") String currency
) {

}
