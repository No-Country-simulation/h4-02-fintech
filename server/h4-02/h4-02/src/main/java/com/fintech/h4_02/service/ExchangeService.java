package com.fintech.h4_02.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fintech.h4_02.dto.coin.CoinDtoRequest;
import com.fintech.h4_02.dto.coin.CoinPrice;
import com.fintech.h4_02.dto.exchange.ExchangeResponse;
import com.fintech.h4_02.dto.exchange.ExchangeRrequest;
import com.fintech.h4_02.dto.exchange.ExchangeSimple;
import com.fintech.h4_02.dto.exchange.GetCoinByDatesRequest;
import com.fintech.h4_02.entity.ExchangeEntity;
import com.fintech.h4_02.entity.UserEntity;
import com.fintech.h4_02.enums.Coin;
import com.fintech.h4_02.enums.State;
import com.fintech.h4_02.exception.EntityNotFoundException;
import com.fintech.h4_02.repository.ExchangeRepository;
import com.fintech.h4_02.repository.UserRepository;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ExchangeService {
    private final ExchangeRepository exchangeRepository;
    private final UserRepository userRepository;
    private final RestTemplate restTemplate;
    private final ObjectMapper mapper;
    private final String apikey = "2e2212a9163545fe83aee5773eb1639b";

    public List<CoinDtoRequest> listCoinAllForex(Coin coin) throws JsonProcessingException, JSONException {
        String url = null;
        final String forex = "https://api.twelvedata.com/forex_pairs";
        final String commodities = "https://api.twelvedata.com/commodities?source=docs";
        if (coin.name().equalsIgnoreCase(Coin.FOREX.toString())) {
            url = forex;
        } else if (coin.name().equalsIgnoreCase(Coin.COMMODITIES.toString())) {
            url = commodities;
        } else if (coin.name().equalsIgnoreCase(Coin.ETFS.toString())) {
            return listarEtfs();
        } else if (coin.name().equalsIgnoreCase(Coin.BOND.toString())) {
            return listBond();
        }
        return parcearDtoApi(url);
    }

    private List<CoinDtoRequest> listBond() {
        List<String> listString = List.of("AAPL", "GOOGL", "MSFT", "AMZN", "TSLA", "FB", "NFLX", "NVDA", "BABA", "V");
        return listString.stream().map(CoinDtoRequest::new).toList();
    }

    private List<CoinDtoRequest> parcearDtoApi(final String API_URL) throws JsonProcessingException {
        // Obtener la respuesta como String
        String jsonResponse = restTemplate.getForObject(API_URL, String.class);
        // Parsear la respuesta y extraer el nodo "data"
        JsonNode rootNode = mapper.readTree(jsonResponse);
        JsonNode dataNode = rootNode.get("data");
        // Deserializar el nodo "data" como una lista de CoinDto
        return mapper.readValue(dataNode.toString(), new TypeReference<>() {
        });
    }

    private List<CoinDtoRequest> listarEtfs() {
        final String etfs = "https://api.twelvedata.com/etfs/list?apikey=".concat(apikey).concat("&source=docs");
        JsonNode jsonResponse = restTemplate.getForObject(etfs, JsonNode.class);
        if (jsonResponse == null) {
            throw new RestClientException("Error fetching ETFs data from API");
        }
        // Check if the response has an error
        if (jsonResponse.has("error")) {
            throw new RestClientException("Error en la respuesta de la API: " + jsonResponse.get("error").asText());
        }
        if (!jsonResponse.has("result")) {
            return List.of();
        }
        JsonNode list = jsonResponse.get("result").get("list");
        if (!list.isArray()) {
            return List.of();
        }
        List<CoinDtoRequest> listCoin = new ArrayList<>();
        for (JsonNode item : list) {
            if (!item.has("symbol")) {
                continue;
            }
            String symbol = item.get("symbol").asText();
            CoinDtoRequest coin = new CoinDtoRequest(symbol);
            listCoin.add(coin);
        }
        return listCoin;
    }

    public JsonNode connectionPrice(String coin) throws JsonProcessingException {
        final String url = "https://api.twelvedata.com/time_series?symbol="
                .concat(coin)
                .concat("&interval=1min&date=last&outputsize=1&apikey=")
                .concat(apikey);
        return connectionApi(url);
    }

    public JsonNode getCoinDescription(String coin) throws JsonProcessingException {
        final String url = "https://api.twelvedata.com/profile?symbol="
                .concat(coin)
                .concat("&apikey=")
                .concat(apikey);
        return connectionApi(url);
    }

    public JsonNode getCoinByDates(GetCoinByDatesRequest getCoinByDatesRequest) throws JsonProcessingException {
        final String url = "https://api.twelvedata.com/time_series?end_date="
                .concat(getCoinByDatesRequest.end().toString())
                .concat("&start_date=")
                .concat(getCoinByDatesRequest.start().toString())
                .concat("&symbol=")
                .concat(getCoinByDatesRequest.coin())
                .concat("&interval=1day&apikey=")
                .concat(apikey);
        return connectionApi(url);
    }

    public ExchangeResponse create(ExchangeRrequest exchangeRrequest) {
        final UserEntity user = userRepository.findById(exchangeRrequest.userId()).orElseThrow(() -> new EntityNotFoundException("user not found"));
        final BigDecimal value = new BigDecimal(exchangeRrequest.value());
        final BigDecimal total = value.multiply(BigDecimal.valueOf(exchangeRrequest.quantity()));
        ExchangeEntity exchange = ExchangeEntity.builder()
                .value(value)
                .date(LocalDate.now())
                .coin(exchangeRrequest.coin())
                .user(user)
                .state(State.BY)
                .quantity(exchangeRrequest.quantity())
                .total(total)
                .build();
        final ExchangeEntity exchangeDb = exchangeRepository.save(exchange);
        return new ExchangeResponse(exchangeDb);
    }

    public List<ExchangeResponse> getByUser(@NotNull Long id) {
        UserEntity user = userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("user not found"));
        List<ExchangeEntity> list = exchangeRepository.findAllByUserId(user);
        return list.stream().map(ExchangeResponse::new).toList();
    }

    public List<ExchangeSimple> getTotalCoinByUser(@NotNull Long id) {
        final UserEntity user = userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("user not found"));
        List<Object> list = exchangeRepository.getTotalCoinByUser(user);
        return list.stream().map(ExchangeSimple::fromObjectList).toList();
    }

    public ExchangeResponse sell(ExchangeRrequest exchangeRrequest) {
        final UserEntity user = userRepository.findById(exchangeRrequest.userId()).orElseThrow(() -> new EntityNotFoundException("user not found"));
        final BigDecimal value = new BigDecimal(exchangeRrequest.value());
        final BigDecimal total = value.multiply(BigDecimal.valueOf(exchangeRrequest.quantity()));
        checkUserCoinStock(user, exchangeRrequest.coin(), exchangeRrequest.quantity());
        ExchangeEntity exchange = ExchangeEntity.builder()
                .value(value)
                .date(LocalDate.now())
                .coin(exchangeRrequest.coin())
                .user(user)
                .state(State.SELL)
                .quantity(exchangeRrequest.quantity())
                .total(total)
                .build();
        final ExchangeEntity exchangeDb = exchangeRepository.save(exchange);
        return new ExchangeResponse(exchangeDb);
    }

    private void checkUserCoinStock(@NotNull UserEntity user, @NotBlank String coin, @NotBlank int quantity) {
        List<Object> list = exchangeRepository.getTotalCoinByUser(user);
        List<ExchangeSimple> dtoList = list.stream().map(ExchangeSimple::fromObjectList).toList();
        Optional<ExchangeSimple> exchangeSimple = dtoList.stream().filter(d -> d.coin().equals(coin)).findFirst();
        if (exchangeSimple.isEmpty()) {
            throw new RuntimeException("no tienes ".concat(coin).concat("en tu cuenta"));
        }
        if (exchangeSimple.get().total() < quantity) {
            throw new RuntimeException("no tienes suficiente cantidad de".concat(coin));
        }
    }

    public List<CoinPrice> findPriceCoins(UserEntity user) {
        return exchangeRepository.findPriceCoins(user);
    }

    public List<CoinPrice> findPriceSellCoins(List<ExchangeSimple> coins) throws JsonProcessingException, JSONException {
        List<CoinPrice> list = new ArrayList<>();
        for (ExchangeSimple e : coins) {
            JsonNode response = connectionPrice(e.coin());
            String value = getCloseValueFromApiResponse(String.valueOf(response));
            list.add(new CoinPrice(e.coin(), Double.valueOf(value)));
        }
        return list;
    }

    private String getCloseValueFromApiResponse(String jsonResponse) throws JSONException {
        JSONObject jsonObject = new JSONObject(jsonResponse);
        JSONArray valuesArray = jsonObject.getJSONArray("values");
        if (valuesArray.length() > 0) {
            JSONObject firstValueObject = valuesArray.getJSONObject(0);
            return firstValueObject.getString("close");
        }
        return null;
    }

    private JsonNode connectionApi(String url) throws JsonProcessingException {
        String jsonResponse = restTemplate.getForObject(url, String.class);
        return mapper.readTree(jsonResponse);
    }

}
