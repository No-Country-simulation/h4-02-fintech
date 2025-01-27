package com.fintech.h4_02.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fintech.h4_02.dto.exchange.ExchangeResponse;
import com.fintech.h4_02.dto.exchange.ExchangeRrequest;
import com.fintech.h4_02.dto.coin.CoinDtoRequest;
import com.fintech.h4_02.dto.wallet.WalletResponse;
import com.fintech.h4_02.enums.Coin;
import com.fintech.h4_02.service.ExchangeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.json.JSONException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("api/v1/exchange")
@AllArgsConstructor
public class ExchangeController {

    private ExchangeService exchangeService;

    @Operation(
            summary = "get all coin",
            description = "get list of coin",
            tags = {"ExchangeEntity"}
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "gel list of coin",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = WalletResponse.class),
                            examples = @ExampleObject(name = "list CoinDtoRequest",
                                    value = "[ { \"symbol\" : \"C_1\" }, {\"symbol\" : \"CC1\" }, { \"symbol\" : \"CHE\" }, { \"symbol\" : \"CL1\" }]"))
            )
    })
    @GetMapping("/all/{coin}")
    public ResponseEntity<List<CoinDtoRequest>> getAllExcange(@PathVariable Coin coin) throws JsonProcessingException, JSONException {
        return ResponseEntity.status(HttpStatus.OK).body(exchangeService.listCoinAllForex(coin));

    }


    @Operation(
            summary = "get price coin",
            description = "get price of coin",
            tags = {"ExchangeEntity"}
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "gel a coin",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = JsonNode.class),
                            examples = @ExampleObject(name = "JsonNode",
                                    value = "{ \"meta\" : { \"symbol\" : \"AAPL\", \"interval\" : \"1min\", \"currency\" : \"USD\",\"exchange_timezone\" : \"America/New_York\", \"exchange\" : \"NASDAQ\",\"mic_code\" : \"XNGS\", \"type\" : \"Common Stock\"}, \"values\" : [ { \"datetime\" : \"2025-01-24 09:30:00\", \"open\" : \"224.97501\", \"high\" : \"225.63000\", \"low\" : \"224.77000\", \"close\" : \"225.080002\", \"volume\" : \"4979157\" } ]"))
            )
    })
    @GetMapping("/price/{coin}")
    public ResponseEntity<JsonNode> getPrice(@PathVariable String coin) throws JsonProcessingException, JSONException {
        return ResponseEntity.status(HttpStatus.OK).body(exchangeService.conectionPrice(coin));

    }

    @Operation(
            summary = "get description coin",
            description = "get description of coin",
            tags = {"ExchangeEntity"}
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "gel a coin",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = JsonNode.class),
                            examples = @ExampleObject(name = "JsonNode",
                                    value = "{ \"symbol\" : \"AAPL\", \"name\" : \"Apple Inc\",\"exchange\" : \"NASDAQ\", \"mic_code\" : \"XNGS\", \"sector\" : \"Technology\", \"industry\" : \"Consumer Electronics\", \"employees\" : 164000,\"website\" : \"https://www.apple.com\", \"description\" : \"Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, a line of smartphones; Mac, a line of personal computers; iPad, a line of multi-purpose tablets; and wearables, home, and accessories comprising AirPods, Apple TV, Apple Watch, Beats products, and HomePod. It also provides AppleCare support and cloud services; and operates various platforms, including the App Store that allow customers to discover and download applications and digital content, such as books, music, video, games, and podcasts, as well as advertising services include third-party licensing arrangements and its own advertising platforms. In addition, the company offers various subscription-based services, such as Apple Arcade, a game subscription service; Apple Fitness+, a personalized fitness service; Apple Music, which offers users a curated listening experience with on-demand radio stations; Apple News+, a subscription news and magazine service; Apple TV+, which offers exclusive original content; Apple Card, a co-branded credit card; and Apple Pay, a cashless payment service, as well as licenses its intellectual property. The company serves consumers, and small and mid-sized businesses; and the education, enterprise, and government markets. It distributes third-party applications for its products through the App Store. The company also sells its products through its retail and online stores, and direct sales force; and third-party cellular network carriers, wholesalers, retailers, and resellers. Apple Inc. was founded in 1976 and is headquartered in Cupertino, California.\", \"type\" : \"Common Stock\", \"CEO\" : \"Mr. Timothy D. Cook\", \"address\" : \"One Apple Park Way\",\"address2\" : \"\", \"city\" : \"Cupertino\", \"zip\" : \"95014\", \"state\" : \"CA\",\"country\" : \"United States\", \"phone\" : \"(408) 996-1010\" }"))
            )
    })
    @GetMapping("/description/{coin}")
    public ResponseEntity<JsonNode> getCoinDescription(@PathVariable String coin) throws JsonProcessingException, JSONException {
        return ResponseEntity.status(HttpStatus.OK).body(exchangeService.getDescription(coin));

    }


    @Operation(
            summary = "by  coin",
            description = "by a coin",
            tags = {"ExchangeEntity"}
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "gel a coin",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = JsonNode.class),
                            examples = @ExampleObject(name = "JsonNode",
                                    value = "{\"id\" : 202,\"coin\" : \"AAPL\", \"value\" : 5236.5, \"date\" : \"2025-01-26\", \"state\" : \"BY\", \"user\" : {\"id\" : 1, \"email\" : \"123@123.COM\", \"name\" : \"a r\", \"dni\" : \"4444444\", \"roles\" : [ {\"id\" : 1, \"name\" : \"INVERSIONISTA\"} ]"))
            )
    })
    @PostMapping
    public ResponseEntity<ExchangeResponse> crateExchange(@RequestBody @Valid ExchangeRrequest ExchangeRrequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(exchangeService.create(ExchangeRrequest));
    }
}
