package com.fintech.h4_02.controller;

import com.fintech.h4_02.dto.queries.QueryRequest;
import com.fintech.h4_02.dto.queries.QueryResponse;
import com.fintech.h4_02.service.QueryService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("api/v1/queries")
@AllArgsConstructor
@Tag(name = "QueryEntity")
public class QueriesController {

    private final QueryService queryService;

    @PostMapping
    public ResponseEntity<QueryResponse> createQuery(@RequestBody @Valid QueryRequest queryRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(queryService.createQuery(queryRequest));
    }


}
