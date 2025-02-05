package com.fintech.h4_02.dto.queries;

import jakarta.validation.constraints.NotNull;

import java.util.Set;

public record QueryRequest(
        @NotNull
        Long userId,

        @NotNull
        String affectedArea,

        @NotNull
        String description,

        @NotNull
        String lastUpdate,

        @NotNull
        Set<String> takenActions,

        @NotNull
        String assignedTo,

        @NotNull
        String estimated
) {

}
