package com.fintech.h4_02.dto.queries;

import com.fintech.h4_02.dto.user.UserResponseSimple;
import com.fintech.h4_02.entity.QueryEntity;
import com.fintech.h4_02.enums.QueriesState;

import java.time.LocalDateTime;
import java.util.Set;

public record QueryResponse(
        Long id,

        LocalDateTime date,

        UserResponseSimple user,

        String affectedArea,

        String description,

        String lastUpdate,

        Set<String> takenActions,

        String assignedTo,

        String estimated,

        QueriesState state
) {

    public QueryResponse(QueryEntity query) {
        this(
                query.getId(),
                query.getDate(),
                new UserResponseSimple(query.getUser()),
                query.getAffectedArea(),
                query.getDescription(),
                query.getLastUpdate(),
                query.getTakenActions(),
                query.getAssignedTo(),
                query.getEstimated(),
                query.getState()
        );
    }

}
