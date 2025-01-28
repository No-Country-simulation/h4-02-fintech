package com.fintech.h4_02.repository;

import com.fintech.h4_02.dto.coin.CoinPrice;
import com.fintech.h4_02.entity.ExchangeEntity;
import com.fintech.h4_02.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExchangeRepository extends JpaRepository<ExchangeEntity,Long> {

    @Query("SELECT e FROM ExchangeEntity e WHERE e.user =:user")
    List<ExchangeEntity> findAllByUserId(@Param("user") UserEntity user);


    @Query("SELECT e.coin, " +
            "SUM(CASE WHEN e.state = 'BY' THEN e.quantity ELSE -e.quantity END) " +
            "FROM ExchangeEntity e " +
            "WHERE e.user = :user " +
            "GROUP BY e.coin")
    List<Object> getTotalCoinByUser(@Param("user") UserEntity user);



    @Query("SELECT NEW com.fintech.h4_02.dto.coin.CoinPrice( e.coin, AVG(e.quantity) ) FROM ExchangeEntity e WHERE e.user =:user GROUP BY e.coin ORDER BY e.coin")
    List<CoinPrice> findPriceCoins(@Param("user") UserEntity user);

}
