package com.fintech.h4_02.service;

import com.fintech.h4_02.dto.queries.QueryRequest;
import com.fintech.h4_02.dto.queries.QueryResponse;
import com.fintech.h4_02.entity.QueryEntity;
import com.fintech.h4_02.entity.UserEntity;
import com.fintech.h4_02.enums.QueriesState;
import com.fintech.h4_02.exception.EntityNotFoundException;
import com.fintech.h4_02.repository.QueryRepository;
import com.fintech.h4_02.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QueryService {
    private final QueryRepository queryRepository;
    private final UserRepository userRepository;

    public List<QueryResponse> getAllErrorQueries() {
        List<QueryEntity> list = queryRepository.findAllByState(QueriesState.ERROR);
        return list.stream().map(QueryResponse::new).toList();
    }

    public Long getErrorQueriesCount() {
        return queryRepository.count();
    }

    public QueryResponse createQuery(QueryRequest request) {
        UserEntity user = userRepository.findById(request.userId())
                .orElseThrow(() -> new EntityNotFoundException("user not found"));

        QueryEntity query = QueryEntity.builder()
                .date(LocalDateTime.now())
                .user(user)
                .affectedArea(request.affectedArea())
                .description(request.description())
                .lastUpdate(request.lastUpdate())
                .takenActions(request.takenActions())
                .assignedTo(request.assignedTo())
                .estimated(request.estimated())
                .state(QueriesState.QUERY)
                .build();
        query = queryRepository.save(query);
        return new QueryResponse(query);
    }

    public QueryResponse createErrorQuery(QueryRequest request) {
        UserEntity user = userRepository.findById(request.userId())
                .orElseThrow(() -> new EntityNotFoundException("user not found"));

        QueryEntity query = QueryEntity.builder()
                .date(LocalDateTime.now())
                .user(user)
                .affectedArea(request.affectedArea())
                .description(request.description())
                .lastUpdate(request.lastUpdate())
                .takenActions(request.takenActions())
                .assignedTo(request.assignedTo())
                .estimated(request.estimated())
                .state(QueriesState.ERROR)
                .build();
        query = queryRepository.save(query);
        return new QueryResponse(query);
    }

}
