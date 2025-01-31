package com.fintech.h4_02.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fintech.h4_02.dto.user.UpdateUserProfileDto;
import com.fintech.h4_02.dto.user.UserFinancialRadiography;
import com.fintech.h4_02.dto.user.UserResponseDto;
import com.fintech.h4_02.entity.UserEntity;
import com.fintech.h4_02.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("api/v1/user")
@RequiredArgsConstructor
@Tag(name = "UserEntity", description = "User operations")
public class UserController {
    private final UserService userService;

    @Operation(summary = "Get a user", description = "Get a  user by id")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Get user by id successfully",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = UserResponseDto.class),
                            examples = @ExampleObject(
                                    name = "Get user by id",
                                    value = """
                                            {
                                                "id": 352,
                                                "email": "liontestlogin@gmail",
                                                "name": "Lione120570fb-527f-403a-bb7a-cf6384efc885",
                                                "dni": "120570fb-527f-403a-bb7a-cf6384efc885",
                                                "oauthProvider": "GOOGLE",
                                                "roles": [
                                                    {
                                                        "id": 1,
                                                        "name": "INVERSIONISTA"
                                                    }
                                                ],
                                                "onboarding": {
                                                    "id": 202,
                                                    "goals": [
                                                        {
                                                            "id": 1,
                                                            "name": "bienes"
                                                        },
                                                        {
                                                            "id": 2,
                                                            "name": "retiro"
                                                        },
                                                        {
                                                            "id": 52,
                                                            "name": "proyecto"
                                                        }
                                                    ],
                                                    "riskPreference": "MODERADO",
                                                    "monthlyIncome": 30.06,
                                                    "monthlyExpenses": 352,
                                                    "savingsPercentage": 30.5,
                                                    "knowledgeLevel": "PRINCIPIANTE",
                                                    "completed": true
                                                }
                                            """)
                    )
            )
    })
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable Long id) {
        UserEntity userEntity = userService.getUserById(id);
        return ResponseEntity.status(HttpStatus.OK).body(new UserResponseDto(userEntity));
    }

    @Operation(
            summary = "Get all users",
            description = "Get all users registered in the system. This endpoint can only be called with an ADMIN account"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Users fetched successfully.",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = UserResponseDto.class)
                    )
            )
    })
    @GetMapping
    @RolesAllowed({"ADMIN"})
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        List<UserEntity> users = userService.getAllUsers();
        return ResponseEntity.ok(users.stream().map(UserResponseDto::new).toList());
    }

    @Operation(summary = "Update user profile", description = "Update the user profile for additional info and notifications config")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "User profile is successfully updated",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = UserResponseDto.class)
                    )
            )
    })
    @PutMapping("/{id}/profile")
    public ResponseEntity<UpdateUserProfileDto> updateUserProfile(@PathVariable Long id, @RequestBody @Valid UpdateUserProfileDto dto) {
        UserEntity userEntity = userService.updateUserProfile(id, dto);
        return ResponseEntity.status(HttpStatus.OK).body(new UpdateUserProfileDto(userEntity));
    }

    @Operation(summary = "radiography financial", description = "Get a radiography-financial by user by id")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Get radiography-financial ",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = UserFinancialRadiography.class)
                    )
            )
    })
    @GetMapping("/{userId}/financial-radiography")
    public ResponseEntity<UserFinancialRadiography> getUseFinancialXRay(
            @PathVariable Long userId
    ) throws JSONException, JsonProcessingException {
        return ResponseEntity.status(HttpStatus.OK).body(userService.calculateUserFinancialXRay(userId));
    }

}
