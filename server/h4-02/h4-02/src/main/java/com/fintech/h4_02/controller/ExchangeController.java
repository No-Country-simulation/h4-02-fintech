package com.fintech.h4_02.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fintech.h4_02.dto.CoinDto;
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
import lombok.AllArgsConstructor;
import org.json.JSONException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.xml.parsers.ParserConfigurationException;
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
            @ApiResponse(responseCode = "200", description = "gel list of coin",
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

  /*  @PostMapping
    public ResponseEntity crateExchange(@RequestBody ){
        return ResponseEntity.status(HttpStatus.OK).body(exchangeService.create());
    }*/
}
