package com.fintech.h4_02.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fintech.h4_02.dto.user.FinancialProfileDto;
import com.fintech.h4_02.service.FinancialProfileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/user/{userId}/financial-profile")
@RequiredArgsConstructor
@Tag(name = "Financial profile")
public class FinancialProfileController {
    private final FinancialProfileService financialProfileService;

    @Operation(summary = "Get user financial profile")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = FinancialProfileDto.class)
                    )
            )
    })
    @GetMapping
    public ResponseEntity<FinancialProfileDto> getFinancialProfile(@PathVariable Long userId) throws JSONException, JsonProcessingException {
        FinancialProfileDto financialProfile = financialProfileService.getFinancialProfile(userId);
        return ResponseEntity.ok(financialProfile);
    }

    @Operation(summary = "Create or update user financial profile")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = FinancialProfileDto.class)
                    )
            )
    })
    @PostMapping
    public ResponseEntity<FinancialProfileDto> createOrUpdateFinancialProfile(@PathVariable Long userId, @RequestBody @Valid FinancialProfileDto dto) {
        FinancialProfileDto result = financialProfileService.createOrUpdateFinancialProfile(userId, dto);
        return ResponseEntity.ok(result);
    }

}
