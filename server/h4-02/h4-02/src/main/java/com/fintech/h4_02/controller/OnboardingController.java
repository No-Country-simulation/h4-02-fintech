package com.fintech.h4_02.controller;

import com.fintech.h4_02.dto.onboarding.OnboardingRequest;
import com.fintech.h4_02.service.OnboardingService;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@Controller
@RequestMapping("api/v1/onboarding")
@AllArgsConstructor
public class OnboardingController {

    private  OnboardingService onboardingService;

    @Operation(
            summary = "Create a Onboarding",
            description = "Create a new Onboarding",
            tags = {"Onboarding"}
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Onboarding created successfully",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = OnboardingRequest.class),
                            examples = @ExampleObject(name = "WishlistRequestCreate", value = ""))
            )
    })
    @PostMapping
    public ResponseEntity<?>createOnboarding(@RequestBody OnboardingRequest onboardingRequest ){
        return ResponseEntity.status(HttpStatus.CREATED).body(onboardingService.create(onboardingRequest)) ;

    }


}
