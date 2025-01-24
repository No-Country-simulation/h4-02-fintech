package com.fintech.h4_02.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fintech.h4_02.enums.Coin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ExchangeService {

    @Autowired
    private RestTemplate restTemplate;
    public JsonNode listCoinAll(Coin coin) {


         final String API_URL = "https://api.twelvedata.com/symbol_search?symbol_type="+coin+"&exchange=BUENOSAIRES&apikey=9c41e2e67bc44ce180fcced64b41ea11";
        return restTemplate.getForObject(API_URL, JsonNode.class);
    }
}
