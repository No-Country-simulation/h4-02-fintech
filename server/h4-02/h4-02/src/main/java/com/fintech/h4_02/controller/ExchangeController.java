package com.fintech.h4_02.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
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
                            examples = @ExampleObject(name = "list JsonNode",
                                    value = ""))
            )
    })
    @GetMapping("/all/{coin}")
    public ResponseEntity<List<CoinDtoRequest>> getAllExcange(@PathVariable Coin coin) throws JsonProcessingException, JSONException {
        return ResponseEntity.status(HttpStatus.OK).body(exchangeService.listCoinAllForex(coin));

    }

  /*  @PostMapping
    public ResponseEntity crateExchange(@RequestBody ){
        return ResponseEntity.status(HttpStatus.OK).body(exchangeService.create());
    }*/
}
