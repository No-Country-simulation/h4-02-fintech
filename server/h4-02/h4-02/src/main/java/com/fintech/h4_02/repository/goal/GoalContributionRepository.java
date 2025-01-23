package com.fintech.h4_02.repository.goal;

import com.fintech.h4_02.entity.goal.GoalContribution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface GoalContributionRepository extends JpaRepository<GoalContribution, Long> {

    /**
     * Calculates the total sum of the amount for all contributions associated with a specific Goal.
     *
     * @param goalId The ID of the Goal.
     * @return The total sum as a BigDecimal.
     */
    @Query("SELECT COALESCE(SUM(gc.amount), 0) FROM GoalContribution gc WHERE gc.goal.id = :goalId")
    BigDecimal findTotalAmountByGoalId(@Param("goalId") Long goalId);

}
