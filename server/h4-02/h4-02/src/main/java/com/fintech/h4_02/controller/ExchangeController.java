package com.fintech.h4_02.controller;

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
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

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
                                    value = "[ {\n" +
                                            "      \"symbol\" : \"A\",\n" +
                                            "      \"instrument_name\" : \"Agilent Technologies, Inc.\",\n" +
                                            "      \"exchange\" : \"NYSE\",\n" +
                                            "      \"mic_code\" : \"XNYS\",\n" +
                                            "      \"exchange_timezone\" : \"America/New_York\",\n" +
                                            "      \"instrument_type\" : \"Common Stock\",\n" +
                                            "      \"country\" : \"United States\",\n" +
                                            "      \"currency\" : \"USD\"\n" +
                                            "    }, {\n" +
                                            "      \"symbol\" : \"A\",\n" +
                                            "      \"instrument_name\" : \"Armor Minerals Inc\",\n" +
                                            "      \"exchange\" : \"TSXV\",\n" +
                                            "      \"mic_code\" : \"XTSX\",\n" +
                                            "      \"exchange_timezone\" : \"America/Toronto\",\n" +
                                            "      \"instrument_type\" : \"Common Stock\",\n" +
                                            "      \"country\" : \"Canada\",\n" +
                                            "      \"currency\" : \"CAD\"\n" +
                                            "    }\n" +
                                            "]"))
            )
    })
    @GetMapping("/all/{coin}")
    public ResponseEntity<?> getAllExcange(@PathVariable Coin coin){
        return ResponseEntity.status(HttpStatus.OK).body(exchangeService.listCoinAll(coin));

    }
}
