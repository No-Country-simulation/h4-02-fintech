package com.fintech.h4_02.controller;

import com.fintech.h4_02.dto.onboarding.OnboardingRequest;
import com.fintech.h4_02.dto.user.UserResponseDto;
import com.fintech.h4_02.service.OnboardingService;
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
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("api/v1/onboarding")
@RequiredArgsConstructor
@Tag(name = "Onboarding", description = "Onboarding operations")
public class OnboardingController {
    private final OnboardingService onboardingService;

    @Operation(
            summary = "Creates of updates an Onboarding Entity",
            description = "Create a new Onboarding Entity or updates an existing one"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Onboarding created or updated successfully",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = UserResponseDto.class),
                            examples = @ExampleObject(
                                    name = "Onboarding created or updated",
                                    value = " \"{\\\"id\\\":352,\\\"email\\\":\\\"liontestlogin@gmail\\\",\\\"password\\\":\\\"$2a$10$ne1FiCa5ul0NPgZJo4qYs.cE3Cyg3NAVUcR.girEsWZLBBYJvYmhS\\\",\\\"name\\\":\\\"Lione120570fb-527f-403a-bb7a-cf6384efc885\\\",\\\"dni\\\":\\\"120570fb-527f-403a-bb7a-cf6384efc885\\\",\\\"roles\\\":[{\\\"id\\\":1,\\\"name\\\":\\\"INVERSIONISTA\\\"}],\\\"onboarding\\\":{\\\"id\\\":202,\\\"goals\\\":[{\\\"id\\\":1,\\\"name\\\":\\\"bienes\\\"},{\\\"id\\\":2,\\\"name\\\":\\\"retiro\\\"},{\\\"id\\\":52,\\\"name\\\":\\\"proyecto\\\"}],\\\"riskPreference\\\":\\\"MODERADO\\\",\\\"monthlyIncome\\\":30.06,\\\"monthlyExpenses\\\":352,\\\"savingsPercentage\\\":30.5,\\\"knowledgeLevel\\\":\\\"PRINCIPIANTE\\\"}}\";\n"
                            )
                    )
            )
    })
    @PostMapping
    public ResponseEntity<UserResponseDto> createOrUpdateOnboarding(@RequestBody @Valid OnboardingRequest request) {
        return ResponseEntity.status(HttpStatus.OK).body(onboardingService.createOrUpdateOnboarding(request));
    }

}
