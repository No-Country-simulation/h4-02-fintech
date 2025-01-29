package com.fintech.h4_02.controller;

import com.fintech.h4_02.config.security.LoggedUser;
import com.fintech.h4_02.config.security.SecurityUserDetails;
import com.fintech.h4_02.service.RecommendationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
    @GetMapping("/stocks")
    public ResponseEntity<List<String>> getRecommendedStocks(@LoggedUser SecurityUserDetails userDetails) {
        Long userId = userDetails.getId();
        return ResponseEntity.ok(recommendationService.getRecommendations(userId));
    }

}
