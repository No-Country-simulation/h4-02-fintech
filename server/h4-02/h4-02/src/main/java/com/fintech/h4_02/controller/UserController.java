package com.fintech.h4_02.controller;

import com.fintech.h4_02.dto.User.UserCreated;
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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@Controller
@RequestMapping("api/v1/user")
@CrossOrigin("*")
@AllArgsConstructor
public class UserController {


    private  UserService userService;



    @PostMapping
    @Operation(
            summary = "Create a User",
            description = "Create a new UserEntity",
            tags = {"UserEntity"}
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "User created successfully",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = UserEntity.class),
                            examples = @ExampleObject(name = "WishlistRequestCreate",
                                    value =  ""

                            )))
    })
    public ResponseEntity<?> createUser(@RequestBody @Valid UserCreated user){
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(user));
    } catch (Exception ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", ex.getMessage()));
    }
    }

}
