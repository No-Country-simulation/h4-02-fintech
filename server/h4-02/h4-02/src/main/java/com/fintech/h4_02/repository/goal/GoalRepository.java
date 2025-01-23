package com.fintech.h4_02.repository.goal;

import com.fintech.h4_02.entity.goal.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface GoalRepository extends JpaRepository<Goal, Long> {

    @Query("SELECT g FROM Goals g WHERE g.name =:name")
    Goal findByName(@Param("name") String name);

}
