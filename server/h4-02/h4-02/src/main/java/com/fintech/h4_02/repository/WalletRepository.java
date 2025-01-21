package com.fintech.h4_02.repository;

import com.fintech.h4_02.entity.WalletEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WalletRepository extends JpaRepository<WalletEntity,Long> {
}
