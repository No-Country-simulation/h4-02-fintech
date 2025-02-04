package com.fintech.h4_02.repository;

import com.fintech.h4_02.entity.QueryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QueryRepository extends JpaRepository<QueryEntity,Long> {
}
