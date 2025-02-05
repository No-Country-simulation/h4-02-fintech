package com.fintech.h4_02.repository;

import com.fintech.h4_02.entity.QueryEntity;
import com.fintech.h4_02.enums.QueriesState;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QueryRepository extends JpaRepository<QueryEntity, Long> {

    List<QueryEntity> findAllByState(QueriesState state);

}
