package com.fintech.h4_02.controller;

import com.fintech.h4_02.dto.wallet.WalletResponse;
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
            summary = "Record changes between money in and out",
            description = "money in and out of user",
            tags = {"WalletEntity"}
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "create a change of wallet",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = WalletResponse.class),
                            examples = @ExampleObject(name = "change of wallet to user",
                                    value = ""))
            )
    })
    @GetMapping("/all/{coin}")
    public ResponseEntity<?> getAllExcange(@PathVariable String coin){
        return ResponseEntity.status(HttpStatus.OK).body(exchangeService.listCoinAll(coin));

    }
}
