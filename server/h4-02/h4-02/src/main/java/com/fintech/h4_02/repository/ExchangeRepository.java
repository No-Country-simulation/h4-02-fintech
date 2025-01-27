package com.fintech.h4_02.repository;

import com.fintech.h4_02.entity.ExchangeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExchangeRepository extends JpaRepository<ExchangeEntity,Long> {
}
