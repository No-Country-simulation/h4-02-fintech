package com.fintech.h4_02.repository;

import com.fintech.h4_02.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<UserEntity,Long> {
    @Query("SELECT u FROM UserEntity u WHERE u.email=:email")
    UserEntity findByEmail(@Param("email") String email);
}
