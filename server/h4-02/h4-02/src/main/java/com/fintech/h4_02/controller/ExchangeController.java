package com.fintech.h4_02.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fintech.h4_02.dto.coin.CoinDtoRequest;
import com.fintech.h4_02.dto.exchange.ExchangeResponse;
import com.fintech.h4_02.dto.exchange.ExchangeRrequest;
import com.fintech.h4_02.dto.exchange.ExchangeSimple;
import com.fintech.h4_02.dto.exchange.GetCoinByDatesRequest;
import com.fintech.h4_02.dto.wallet.WalletResponse;
import com.fintech.h4_02.enums.Coin;
import com.fintech.h4_02.service.ExchangeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("api/v1/exchange")
@RequiredArgsConstructor
@Tag(name = "Exchange Entity")
public class ExchangeController {
    private final ExchangeService exchangeService;

    @Operation(summary = "get all coin", description = "get list of coin")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "gel list of coin",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = WalletResponse.class),
                            examples = @ExampleObject(
                                    name = "list CoinDtoRequest",
                                    value = "[ { \"symbol\" : \"C_1\" }, {\"symbol\" : \"CC1\" }, { \"symbol\" : \"CHE\" }, { \"symbol\" : \"CL1\" }]")
                    ))
    })
    @GetMapping("/all/{coin}")
    public ResponseEntity<List<CoinDtoRequest>> getAllExchanges(@PathVariable Coin coin) throws JsonProcessingException, JSONException {
        return ResponseEntity.status(HttpStatus.OK).body(exchangeService.listCoinAllForex(coin));
    }

    @Operation(summary = "get price coin", description = "get price of coin")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "gel a coin",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = JsonNode.class),
                            examples = @ExampleObject(
                                    name = "JsonNode",
                                    value = "{ \"meta\" : { \"symbol\" : \"AAPL\", \"interval\" : \"1min\", \"currency\" : \"USD\",\"exchange_timezone\" : \"America/New_York\", \"exchange\" : \"NASDAQ\",\"mic_code\" : \"XNGS\", \"type\" : \"Common Stock\"}, \"values\" : [ { \"datetime\" : \"2025-01-24 09:30:00\", \"open\" : \"224.97501\", \"high\" : \"225.63000\", \"low\" : \"224.77000\", \"close\" : \"225.080002\", \"volume\" : \"4979157\" } ]")
                    ))
    })
    @GetMapping("/price")
    public ResponseEntity<JsonNode> getExchangePrice(@RequestParam String coin) throws JsonProcessingException {
        return ResponseEntity.status(HttpStatus.OK).body(exchangeService.connectionPrice(coin));
    }

    @Operation(summary = "get description coin", description = "get description of coin")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "gel a coin",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = JsonNode.class),
                            examples = @ExampleObject(
                                    name = "JsonNode",
                                    value = "{ \"symbol\" : \"AAPL\", \"name\" : \"Apple Inc\",\"exchange\" : \"NASDAQ\", \"mic_code\" : \"XNGS\", \"sector\" : \"Technology\", \"industry\" : \"Consumer Electronics\", \"employees\" : 164000,\"website\" : \"https://www.apple.com\", \"description\" : \"Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, a line of smartphones; Mac, a line of personal computers; iPad, a line of multi-purpose tablets; and wearables, home, and accessories comprising AirPods, Apple TV, Apple Watch, Beats products, and HomePod. It also provides AppleCare support and cloud services; and operates various platforms, including the App Store that allow customers to discover and download applications and digital content, such as books, music, video, games, and podcasts, as well as advertising services include third-party licensing arrangements and its own advertising platforms. In addition, the company offers various subscription-based services, such as Apple Arcade, a game subscription service; Apple Fitness+, a personalized fitness service; Apple Music, which offers users a curated listening experience with on-demand radio stations; Apple News+, a subscription news and magazine service; Apple TV+, which offers exclusive original content; Apple Card, a co-branded credit card; and Apple Pay, a cashless payment service, as well as licenses its intellectual property. The company serves consumers, and small and mid-sized businesses; and the education, enterprise, and government markets. It distributes third-party applications for its products through the App Store. The company also sells its products through its retail and online stores, and direct sales force; and third-party cellular network carriers, wholesalers, retailers, and resellers. Apple Inc. was founded in 1976 and is headquartered in Cupertino, California.\", \"type\" : \"Common Stock\", \"CEO\" : \"Mr. Timothy D. Cook\", \"address\" : \"One Apple Park Way\",\"address2\" : \"\", \"city\" : \"Cupertino\", \"zip\" : \"95014\", \"state\" : \"CA\",\"country\" : \"United States\", \"phone\" : \"(408) 996-1010\" }")
                    ))
    })
    @GetMapping("/description/{coin}")
    public ResponseEntity<JsonNode> getCoinDescription(@PathVariable String coin) throws JsonProcessingException {
        return ResponseEntity.status(HttpStatus.OK).body(exchangeService.getCoinDescription(coin));
    }

    @Operation(
            summary = "buy  coin",
            description = "by a coin",
            tags = {"ExchangeEntity"}
    )

    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "gel a coin",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = ExchangeResponse.class),
                            examples = @ExampleObject(name = "JsonNode",
                                    value = "{ \"id\" : 452,\"coin\" : \"AAPL\",\"value\" : 5236.5,\"date\" : \"2025-01-26\",\"state\" : \"BY\",\"user\" : { \"id\" : 1,\"name\" : \"a r\", },\"quantity\" : 5, \"total\" : 26182.5 }")))
    })
    @PostMapping
    public ResponseEntity<ExchangeResponse> crateExchange(@RequestBody @Valid ExchangeRrequest ExchangeRrequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(exchangeService.create(ExchangeRrequest));
    }

    @Operation(
            summary = "sell  coin",
            description = "sell a coin",
            tags = {"ExchangeEntity"}
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "sell a coin",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = ExchangeResponse.class),
                            examples = @ExampleObject(name = "JsonNode",
                                    value = "{\"id\": 402,\"coin\": \"A\",\"value\": 145,\"date\": \"2025-01-27\",\"state\": \"SELL\",\"user\": {\"id\": 1,\"name\": \"Lionel\"},\"quantity\": 1,\"total\": 145}"))
            )
    })
    @PostMapping("/sell")
    public ResponseEntity<ExchangeResponse> sellExchange(@RequestBody @Valid ExchangeRrequest ExchangeRrequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(exchangeService.sell(ExchangeRrequest));
    }

    @Operation(
            summary = "get history exchange by user",
            description = "get history exchange",
            tags = {"ExchangeEntity"}
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "202", description = "get all history for exchange by user",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = ExchangeResponse.class),
                            examples = @ExampleObject(name = "JsonNode",
                                    value = "[{\"id\": 1,\"coin\": \"AAPL\",\"value\": 123.00,\"date\": \"2025-01-27\",\"state\": \"BY\",\"user\": {\"id\": 1,\"name\": \"Lionel\"},\"quantity\": 5,\"total\": 615.00},{\"id\": 2,\"coin\": \"AAPL\",\"value\": 145.00,\"date\": \"2025-01-27\",\"state\": \"BY\",\"user\": {\"id\": 1,\"name\": \"Lionel\"},\"quantity\": 10,\"total\": 1450.00}]"))
            )
    })
    @GetMapping("/{id}")
    public ResponseEntity<List<ExchangeResponse>> getExchangeAllByUserId(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(exchangeService.getByUser(id));
    }

    @Operation(
            summary = "get history exchange by user",
            description = "get history exchange",
            tags = {"ExchangeEntity"}
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "get all history for exchange by user",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = ExchangeSimple.class),
                            examples = @ExampleObject(name = "List<ExchangeSimple>",
                                    value = "[{\"coin\": \"A\",\"total\": 9},{\"coin\": \"AAPL\",\"total\": 77}]"))
            )
    })
    @GetMapping("/total/{id}")
    public ResponseEntity<List<ExchangeSimple>> getTotalCoinByUser(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(exchangeService.getTotalCoinByUser(id));

    }

    @Operation(
            summary = "get history by dates",
            description = "get history exchange by date start and end",
            tags = {"ExchangeEntity"}
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "get all history by coin for dates",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = JsonNode.class),
                            examples = @ExampleObject(name = "JsonNode",
                                    value = "{\"meta\": {\"symbol\": \"A\",\"interval\": \"1day\",\"currency\": \"USD\",\"exchange_timezone\": \"America/New_York\",\"exchange\": \"NYSE\",\"mic_code\": \"XNYS\",\"type\": \"Common Stock\"},\"values\": [{\"datetime\": \"2023-06-05\",\"open\": \"118.58000\",\"high\": \"119.76000\",\"low\": \"117.089996\",\"close\": \"118.35000\",\"volume\": \"1991212\"},{\"datetime\": \"2023-06-02\",\"open\": \"117.77000\",\"high\": \"118.41000\",\"low\": \"116.019997\",\"close\": \"118.22000\",\"volume\": \"3259233\"},{\"datetime\": \"2023-06-01\",\"open\": \"116.97000\",\"high\": \"117.63500\",\"low\": \"115\",\"close\": \"116.26000\",\"volume\": \"3963485\"} ] } }"))
            )
    })
    @GetMapping("/history-by-dates")
    public ResponseEntity<JsonNode> getCoinByDates(@RequestBody @Valid GetCoinByDatesRequest getCoinByDatesRequest) throws JsonProcessingException {
        return ResponseEntity.status(HttpStatus.OK).body(exchangeService.getCoinByDates(getCoinByDatesRequest));
    }

}
