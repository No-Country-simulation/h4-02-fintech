package com.fintech.h4_02.repository;

import com.fintech.h4_02.dto.wallet.ValueDatePairDto;
import com.fintech.h4_02.entity.WalletEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WalletRepository extends JpaRepository<WalletEntity, Long> {

    @Query("SELECT NEW com.fintech.h4_02.dto.wallet.ValueDatePairDto(COALESCE(SUM(w.value), 0) AS value, w.date AS date) " +
            "FROM WalletEntity w " +
            "WHERE w.user.id = :userId " +
            "AND w.state = 'IN' " +
            "GROUP BY w.date")
    List<ValueDatePairDto> calculateIncomeGroupedByDate(@Param("userId") Long userId);

    @Query("SELECT NEW com.fintech.h4_02.dto.wallet.ValueDatePairDto(COALESCE(SUM(w.value), 0) AS value, w.date AS date) " +
            "FROM WalletEntity w " +
            "WHERE w.user.id = :userId " +
            "AND w.state = 'OUT' " +
            "GROUP BY w.date")
    List<ValueDatePairDto> calculateExpensesGroupedByDate(@Param("userId") Long userId);

}
