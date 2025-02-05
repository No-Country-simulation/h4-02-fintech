package com.fintech.h4_02.dto.coin;

import lombok.Setter;


public record CoinResponseMoreBuy(
        String coin,
        int quantity
) {
    public CoinResponseMoreBuy(  String coin, String quantity){
        this(coin, Integer.parseInt(quantity));
    }
}
