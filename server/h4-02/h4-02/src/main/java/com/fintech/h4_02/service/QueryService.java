package com.fintech.h4_02.service;

import com.fintech.h4_02.dto.queries.QueryRequest;
import com.fintech.h4_02.dto.queries.QueryResponse;
import com.fintech.h4_02.entity.QueryEntity;
import com.fintech.h4_02.entity.UserEntity;
import com.fintech.h4_02.enums.QueriesState;
import com.fintech.h4_02.exception.EntityNotFoundException;
import com.fintech.h4_02.repository.QueryRepository;
import com.fintech.h4_02.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class QueryService {

    @Autowired
    private QueryRepository queryRepository;
    @Autowired
    private UserRepository userRepository;
    public QueryResponse createQuery(QueryRequest queryRequest) {
        UserEntity user = userRepository.findById(queryRequest.userId()).orElseThrow( ()-> new EntityNotFoundException("user not found"));
        QueryEntity query = QueryEntity.builder()
                .user(user)
                .description(queryRequest.comment())
                .state(QueriesState.QUERY)
                .date(LocalDate.now())
                .build();

        query = queryRepository.save(query);
        return new QueryResponse(query);
    }
}
