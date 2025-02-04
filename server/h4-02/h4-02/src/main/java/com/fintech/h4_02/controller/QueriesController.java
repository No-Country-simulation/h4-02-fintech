package com.fintech.h4_02.controller;

import com.fintech.h4_02.dto.queries.QueryRequest;
import com.fintech.h4_02.dto.queries.QueryResponse;
import com.fintech.h4_02.dto.wallet.WalletResponse;
import com.fintech.h4_02.service.QueryService;
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
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("api/v1/queries")
@AllArgsConstructor
@Tag(name = "QueryEntity")
public class QueriesController {

    private final QueryService queryService;

    @Operation(summary = "create QueryEntity", description = "create new QueryEntity")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "create a QueryEntity",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = QueryResponse.class),
                            examples = @ExampleObject(
                                    name = "QueryResponse",
                                    value = "{\"id\": 2,\"user\": {\"id\": 1,\"name\": \"Lionel\"},\"date\": \"2025-02-04\",\"description\": \"otra consulta 2\",\"state\": \"QUERY\",\"comments\": []}")
                    ))
    })
    @PostMapping
    public ResponseEntity<QueryResponse> createQuery(@RequestBody @Valid QueryRequest queryRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(queryService.createQuery(queryRequest));
    }


    @Operation(summary = "get Queries", description = "get List QueryEntity")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "get a List QueryEntity",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = List.class),
                            examples = @ExampleObject(
                                    name = "List <QueryResponse>",
                                    value = "[{\"id\": 1,\"user\": {\"id\": 1,\"name\": \"Lionel\"},\"date\": \"2025-02-04\",\"description\": \"consultas y mas consultas\",\"state\": \"QUERY\",\"comments\": []},{\"id\": 2,\"user\": {\"id\": 1,\"name\": \"Lionel\"},\"date\": \"2025-02-04\",\"description\": \"otra consulta 2\",\"state\": \"QUERY\",\"comments\": []}]")
                    ))
    })
    @GetMapping("/{id}")
    public ResponseEntity<List<QueryResponse>> getQueriesByuser(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(queryService.getQueriesByuser(id));
    }


}
