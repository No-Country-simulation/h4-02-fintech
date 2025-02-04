package com.fintech.h4_02.service;

import com.fintech.h4_02.dto.queries.QueryRequest;
import com.fintech.h4_02.dto.queries.QueryResponse;
import com.fintech.h4_02.entity.QueryEntity;
import com.fintech.h4_02.entity.UserEntity;
import com.fintech.h4_02.enums.QueriesState;
import com.fintech.h4_02.exception.EntityNotFoundException;
import com.fintech.h4_02.repository.QueryRepository;
import com.fintech.h4_02.repository.UserRepository;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

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

    public List<QueryResponse> getQueriesByuser(@NotNull(message = "el id no puede ser nulo") Long id) {
        UserEntity user = userRepository.findById(id).orElseThrow( ()-> new EntityNotFoundException("user not found"));
        List<QueryEntity> list = user.getQueries();
        List<QueryResponse> listDto = list.stream().map(QueryResponse::new).toList();
        return listDto;
    }

    public QueryResponse createQueryError(QueryRequest queryRequest) {
        UserEntity user = userRepository.findById(queryRequest.userId()).orElseThrow( ()-> new EntityNotFoundException("user not found"));
        QueryEntity query = QueryEntity.builder()
                .user(user)
                .description(queryRequest.comment())
                .state(QueriesState.ERROR)
                .date(LocalDate.now())
                .build();

        query = queryRepository.save(query);
        return new QueryResponse(query);
    }
}
