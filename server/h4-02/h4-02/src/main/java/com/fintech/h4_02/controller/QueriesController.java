package com.fintech.h4_02.controller;

import com.fintech.h4_02.dto.queries.QueryRequest;
import com.fintech.h4_02.dto.queries.QueryResponse;
import com.fintech.h4_02.service.QueryService;
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
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/queries")
@RequiredArgsConstructor
@Tag(name = "QueryEntity")
public class QueriesController {
    private final QueryService queryService;

    @Operation(summary = "Get error queries (incidences)")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = List.class),
                            examples = @ExampleObject(
                                    name = "List <QueryResponse>",
                                    value = "[{\"id\": 1,\"user\": {\"id\": 1,\"name\": \"Lionel\"},\"date\": \"2025-02-04\",\"description\": \"consultas y mas consultas\",\"state\": \"QUERY\",\"comments\": []},{\"id\": 2,\"user\": {\"id\": 1,\"name\": \"Lionel\"},\"date\": \"2025-02-04\",\"description\": \"otra consulta 2\",\"state\": \"QUERY\",\"comments\": []}]")
                    ))
    })
    @GetMapping("/error")
    public ResponseEntity<List<QueryResponse>> getAllErrorQueries() {
        return ResponseEntity.ok(queryService.getAllErrorQueries());
    }

    @Operation(summary = "Get error queries (incidences) count")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = List.class)
                    ))
    })
    @GetMapping("/error/count")
    public ResponseEntity<Long> getErrorQueriesCount() {
        return ResponseEntity.ok(queryService.getErrorQueriesCount());
    }

    @Operation(summary = "Create a standard query")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = QueryResponse.class),
                            examples = @ExampleObject(
                                    name = "QueryResponse",
                                    value = "{\"id\": 2,\"user\": {\"id\": 1,\"name\": \"Lionel\"},\"date\": \"2025-02-04\",\"description\": \"otra consulta 2\",\"state\": \"QUERY\",\"comments\": []}")
                    ))
    })
    @PostMapping
    public ResponseEntity<QueryResponse> createQuery(@RequestBody @Valid QueryRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(queryService.createQuery(request));
    }

    @Operation(summary = "Create erro query (incidence)")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = QueryResponse.class),
                            examples = @ExampleObject(
                                    name = "QueryResponse",
                                    value = "{\"id\": 2,\"user\": {\"id\": 1,\"name\": \"Lionel\"},\"date\": \"2025-02-04\",\"description\": \"otra consulta 2\",\"state\": \"ERROR\",\"comments\": []}")
                    ))
    })
    @PostMapping("/error")
    public ResponseEntity<QueryResponse> createQueryError(@RequestBody @Valid QueryRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(queryService.createErrorQuery(request));
    }

}
