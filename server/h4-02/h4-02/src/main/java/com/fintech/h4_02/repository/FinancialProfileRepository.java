package com.fintech.h4_02.repository;

import com.fintech.h4_02.entity.FinancialProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FinancialProfileRepository extends JpaRepository<FinancialProfile, Long> {

    @Query("SELECT fp FROM FinancialProfile fp WHERE fp.user.id = :userId")
    Optional<FinancialProfile> findFinancialProfileByUserId(Long userId);

}
