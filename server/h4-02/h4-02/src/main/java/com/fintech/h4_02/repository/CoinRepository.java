package com.fintech.h4_02.repository;

import com.fintech.h4_02.entity.CoinEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoinRepository extends JpaRepository<CoinEntity,Long> {
}
