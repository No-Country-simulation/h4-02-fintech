package com.fintech.h4_02.repository;

import com.fintech.h4_02.dto.exchange.ExchangeResponse;
import com.fintech.h4_02.entity.ExchangeEntity;
import com.fintech.h4_02.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExchangeRepository extends JpaRepository<ExchangeEntity,Long> {

    @Query("SELECT e FROM ExchangeEntity e WHERE e.user =:user")
    List<ExchangeEntity> findAllByUserId(@Param("user") UserEntity user);
}
