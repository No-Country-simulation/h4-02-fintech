package com.fintech.h4_02.controller;

import com.fintech.h4_02.dto.wallet.WalletRequest;
import com.fintech.h4_02.dto.wallet.WalletResponse;
import com.fintech.h4_02.service.WalletService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/wallet")
@RequiredArgsConstructor
@Tag(name = "Wallet Entity")
public class WalletController {
    private final WalletService walletService;

    @Operation(summary = "Record changes between money in and out", description = "money in and out of user")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "create a change of wallet",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = WalletResponse.class),
                            examples = @ExampleObject(
                                    name = "Change of wallet to user",
                                    value = "{\n" +
                                            "    \"id\" : 202,\n" +
                                            "    \"user\" : {\n" +
                                            "      \"id\" : 1,\n" +
                                            "      \"email\" : \"lionel@gmail\",\n" +
                                            "      \"password\" : \"1234\",\n" +
                                            "      \"name\" : \"Lionel\",\n" +
                                            "      \"dni\" : \"258698741\",\n" +
                                            "      \"roles\" : [ ],\n" +
                                            "      \"onboarding\" : null,\n" +
                                            "      \"resetPasswordToken\" : null,\n" +
                                            "      \"tokenExpirationDate\" : null,\n" +
                                            "      \"emailConfirmed\" : false\n" +
                                            "    },\n" +
                                            "    \"description\" : \"Factura de luz\",\n" +
                                            "    \"value\" : 15.0,\n" +
                                            "    \"state\" : \"OUT\",\n" +
                                            "    \"date\" : \"2024-01-21\"\n" +
                                            "  }")
                    ))
    })
    @PostMapping
    public ResponseEntity<WalletResponse> createChangeWallet(@RequestBody @Valid WalletRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(walletService.createWallet(request));
    }

    @Operation(summary = "Update a wallet (transaction)", description = "Updates a wallet with the provided fields.")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Wallet updated successfully",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = WalletResponse.class)
                    ))
    })
    @PutMapping("/{walletId}")
    public ResponseEntity<WalletResponse> updateWallet(
            @PathVariable Long walletId,
            @RequestBody @Valid WalletRequest request
    ) {
        WalletResponse response = walletService.updateWallet(walletId, request);
        return ResponseEntity.ok(response);
    }

}
