package com.fintech.h4_02.controller;

import com.fintech.h4_02.dto.recommendation.RecommendationRequestDto;
import com.fintech.h4_02.service.RecommendationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/recommendations")
@RequiredArgsConstructor
@Tag(name = "Recommendations API", description = "API for retrieving stock recommendations.")
public class RecommendationController {
    private final RecommendationService recommendationService;

    @Operation(
            summary = "Get stock recommendations",
            description = "Returns a list of recommended stock symbols based on the provided criteria.",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Criteria to fetch the stock recommendations.",
                    required = true,
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = RecommendationRequestDto.class)
                    )
            ),
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "List of recommended stock symbols.",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(type = "array", example = "[\"AAPL\", \"BND\"]")
                            )
                    ),
            }
    )
    @PostMapping("/stocks")
    public ResponseEntity<List<String>> getRecommendations(@RequestBody @Valid RecommendationRequestDto dto) {
        return ResponseEntity.ok(recommendationService.getRecommendations(dto));
    }

}
