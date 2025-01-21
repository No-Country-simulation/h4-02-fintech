package com.fintech.h4_02.controller;

import com.fintech.h4_02.dto.user.UserResponseDto;
import com.fintech.h4_02.dto.wallet.WalletRequest;
import com.fintech.h4_02.dto.wallet.WalletResponse;
import com.fintech.h4_02.service.WalletService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/wallet")
@AllArgsConstructor
public class WalleController {

    private final WalletService walletService;

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
                                            "  }"))
            )
    })
    @PostMapping
    public ResponseEntity<?> createChangeWallet(@RequestBody @Valid WalletRequest walletRequest){

        return ResponseEntity.status(HttpStatus.CREATED).body(walletService.create(walletRequest) );
    }
}
