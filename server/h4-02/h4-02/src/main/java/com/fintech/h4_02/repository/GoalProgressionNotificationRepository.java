package com.fintech.h4_02.repository;

import com.fintech.h4_02.entity.GoalProgressionNotification;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoalProgressionNotificationRepository extends JpaRepository<GoalProgressionNotification, Long> {

    @Query("SELECT g FROM GoalProgressionNotification g WHERE g.goal.user.id = :userId")
    List<GoalProgressionNotification> findAllByUserId(@Param("userId") Long userId, Pageable pageable);

    boolean existsByLowerBoundPercentage(Integer lowerBoundPercentage);

}
