package com.fintech.h4_02.controller;

import com.fintech.h4_02.dto.comment.CommentRequest;
import com.fintech.h4_02.dto.comment.CommentResponse;
import com.fintech.h4_02.dto.queries.QueryRequest;
import com.fintech.h4_02.dto.queries.QueryResponse;
import com.fintech.h4_02.entity.CommentEntity;
import com.fintech.h4_02.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("api/v1/comment")
@AllArgsConstructor
@Tag(name = "CommentEntity")
public class CommentController {
    private final CommentService commentService;

    @Operation(summary = "create comment", description = "create new CommentEntity")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "create a CommentEntity",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = CommentResponse.class),
                            examples = @ExampleObject(
                                    name = "CommentResponse",
                                    value = "{\"id\": 2,\"query\": {\"id\": 2,\"user\": {\"id\": 1,\"name\": \"Lionel\"},\"date\": \"2025-02-04\",\"description\": \"otra consulta 2\",\"state\": \"QUERY\",\"comments\": [{\"id\": 1,\"date\": \"2025-02-04\",\"description\": \"otro commentario 2\"},{\"id\": 2,\"date\": \"2025-02-04\",\"description\": \"otro commentario 3\"}]},\"date\": \"2025-02-04\",\"description\": \"otro commentario 3\",\"user\": {\"id\": 1,\"name\": \"Lionel\"}}")
                    ))
    })
    @PostMapping
    public ResponseEntity<CommentResponse> createQuery(@RequestBody @Valid CommentRequest commentRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(commentService.create(commentRequest));
    }

}
