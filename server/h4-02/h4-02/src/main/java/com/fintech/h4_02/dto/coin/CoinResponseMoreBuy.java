package com.fintech.h4_02.dto.coin;

import java.util.Comparator;
import java.util.List;

public record CoinResponseMoreBuy(
        String coin,
        int quantity
) {
    public CoinResponseMoreBuy(  String coin, String quantity){
        this(coin, Integer.parseInt(quantity));
    }
    public static List<CoinResponseMoreBuy> sortListDto(List<CoinResponseMoreBuy> listDto) {
        listDto.sort(Comparator.comparing(CoinResponseMoreBuy::quantity).reversed());
        return listDto;
    }
}
