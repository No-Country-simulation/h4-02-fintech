package com.fintech.h4_02.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fintech.h4_02.dto.CoinDto;
import com.fintech.h4_02.dto.coin.CoinDtoRequest;
import com.fintech.h4_02.enums.Coin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.core.type.TypeReference;

import javax.xml.parsers.ParserConfigurationException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ExchangeService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ObjectMapper mapper;

    public List<CoinDto> listCoinAll(Coin coin) throws ParserConfigurationException {


        final String API_URL = "https://api.twelvedata.com/symbol_search?symbol_type=" + coin + "&exchange=BUENOSAIRES&apikey=9c41e2e67bc44ce180fcced64b41ea11";
        try {
            // Obtener la respuesta como String
            String jsonResponse = restTemplate.getForObject(API_URL, String.class);

            // Parsear la respuesta y extraer el nodo "data"
            JsonNode rootNode = mapper.readTree(jsonResponse);
            JsonNode dataNode = rootNode.get("data");

            // Deserializar el nodo "data" como una lista de CoinDto
            List<CoinDto> list = mapper.readValue(dataNode.toString(), new TypeReference<List<CoinDto>>() {
            });

            return list;
        } catch (Exception e) {
            throw new ParserConfigurationException("Parcer error");
        }
    }

    public List<CoinDtoRequest> listCoinAllForex(Coin coin) throws JsonProcessingException, JSONException {
        String url = null;
        final String forex = "https://api.twelvedata.com/forex_pairs";
        final String commodities = "https://api.twelvedata.com/commodities?source=docs";
        if(coin.name().equalsIgnoreCase("forex")) {
            url = forex;
        }else if(coin.name().equalsIgnoreCase("commodities")) {
            url = forex;
        }else if(coin.name().equalsIgnoreCase("etfs")) {
           return listarEtfs();
        }
        return parcearDtoApi(url);
    }


    private List<CoinDtoRequest> parcearDtoApi(final String API_URL) throws JsonProcessingException {

        // Obtener la respuesta como String
        String jsonResponse = restTemplate.getForObject(API_URL, String.class);

        // Parsear la respuesta y extraer el nodo "data"
        JsonNode rootNode = mapper.readTree(jsonResponse);
        JsonNode dataNode = rootNode.get("data");

        // Deserializar el nodo "data" como una lista de CoinDto
        List<CoinDtoRequest> list = mapper.readValue(dataNode.toString(), new TypeReference<List<CoinDtoRequest>>() {
        });

        return list;

    }





    private List<CoinDtoRequest> listarEtfs() throws JSONException, JsonProcessingException {
        final String etfs = "https://api.twelvedata.com/etfs/list?apikey=9c41e2e67bc44ce180fcced64b41ea11&source=docs";
        List<CoinDtoRequest> listCoin = new ArrayList<>();

        try {
            JsonNode jsonResponse = restTemplate.getForObject(etfs, JsonNode.class);

            // Verificar si la respuesta contiene un error
            if (jsonResponse.has("error")) {
                throw new RestClientException("Error en la respuesta de la API: " + jsonResponse.get("error").asText());
            }

            // Procesar la respuesta
            ObjectMapper mapper = new ObjectMapper();
            JsonNode list = jsonResponse.get("result").get("list");

            if (list.isArray()) {
                for (JsonNode item : list) {
                    String symbol = item.get("symbol").asText();
                    CoinDtoRequest coin = new CoinDtoRequest(symbol);
                    listCoin.add(coin);
                }
            }

            return listCoin;
        } catch (RestClientException e) {
            // Manejar excepciones de la API
            e.printStackTrace();
            throw e;
        }
    }



}
