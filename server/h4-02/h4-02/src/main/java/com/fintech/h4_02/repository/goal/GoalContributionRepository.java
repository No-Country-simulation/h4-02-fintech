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

    /**
     * Calculates the total sum of all {@link GoalContribution} amounts associated with
     * goals belonging to a specific user.
     *
     * @param userId The ID of the user whose goal contributions are to be aggregated
     * @return The sum of all contributions (as {@link BigDecimal}) for the user's goals.
     * Returns {@link BigDecimal#ZERO} if no contributions exist.
     */
    @Query("SELECT COALESCE(SUM(gc.amount), 0) FROM GoalContribution gc WHERE gc.goal.user.id = :userId")
    BigDecimal sumTotalContributionsByUserId(@Param("userId") Long userId);
}
