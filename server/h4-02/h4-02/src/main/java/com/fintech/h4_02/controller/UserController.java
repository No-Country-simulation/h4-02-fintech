package com.fintech.h4_02.controller;

import com.fintech.h4_02.dto.user.CreateUserRequestDto;
import com.fintech.h4_02.dto.user.UserResponseDto;
import com.fintech.h4_02.entity.UserEntity;
import com.fintech.h4_02.service.UserService;
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
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
@RequestMapping("api/v1/user")
@AllArgsConstructor
public class UserController {
    private UserService userService;


    @Operation(
            summary = "get a user",
            description = "get a  user by id",
            tags = {"UserEntity"}
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "get user ok",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = UserResponseDto.class),
                            examples = @ExampleObject(name = "user get by id",
                                    value = " \"{\\\"id\\\":352,\\\"email\\\":\\\"liontestlogin@gmail\\\",\\\"password\\\":\\\"$2a$10$ne1FiCa5ul0NPgZJo4qYs.cE3Cyg3NAVUcR.girEsWZLBBYJvYmhS\\\",\\\"name\\\":\\\"Lione120570fb-527f-403a-bb7a-cf6384efc885\\\",\\\"dni\\\":\\\"120570fb-527f-403a-bb7a-cf6384efc885\\\",\\\"roles\\\":[{\\\"id\\\":1,\\\"name\\\":\\\"INVERSIONISTA\\\"}],\\\"onboarding\\\":{\\\"id\\\":202,\\\"goals\\\":[{\\\"id\\\":1,\\\"name\\\":\\\"bienes\\\"},{\\\"id\\\":2,\\\"name\\\":\\\"retiro\\\"},{\\\"id\\\":52,\\\"name\\\":\\\"proyecto\\\"}],\\\"riskPreference\\\":\\\"MODERADO\\\",\\\"monthlyIncome\\\":30.06,\\\"monthlyExpenses\\\":352,\\\"savingsPercentage\\\":30.5,\\\"knowledgeLevel\\\":\\\"PRINCIPIANTE\\\"}}\";\n"))
            )
    })
    @GetMapping("/id")
    public ResponseEntity<?>getUserById(@RequestParam Long id){
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUserById(id)) ;

    }

}
