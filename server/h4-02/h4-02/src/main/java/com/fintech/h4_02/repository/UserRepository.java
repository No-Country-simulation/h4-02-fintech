package com.fintech.h4_02.repository;

import com.fintech.h4_02.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    boolean existsByEmail(String email);

    Optional<UserEntity> findByEmail(String email);

    Optional<UserEntity> findByResetPasswordToken(String resetPasswordToken);

    @Query("SELECT SUM(w.value) FROM WalletEntity w WHERE w.user =:user AND w.state = 'IN'")
    Optional<BigDecimal> findIngresosByUser(@Param("user") UserEntity user);

    @Query("SELECT SUM(w.value) FROM WalletEntity w WHERE w.user =:user AND w.state = 'OUT'")
    Optional<BigDecimal> findEgresosByUser(@Param("user") UserEntity user);

}
