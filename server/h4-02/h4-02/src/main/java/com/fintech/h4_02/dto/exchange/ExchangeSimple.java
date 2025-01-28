package com.fintech.h4_02.dto.exchange;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public record ExchangeSimple(
        String coin,
        Long total
) {


    public static ExchangeSimple fromObjectList(Object o) {
        if (o instanceof Object[] objArray) {
            // Si el objeto es un arreglo de objetos
            return new ExchangeSimple((String) objArray[0], (Long) objArray[1]);
        } else if (o instanceof List<?> objList) {
            // Si el objeto es una lista de objetos
            return new ExchangeSimple((String) objList.get(0), (Long) objList.get(1));
        } else {
            throw new IllegalArgumentException("Tipo de objeto no soportado");
        }
    }


}
