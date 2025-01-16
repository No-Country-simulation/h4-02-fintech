package com.fintech.h4_02.repository;

import com.fintech.h4_02.entity.Goals;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface GoalRepository extends JpaRepository<Goals,Long> {

    @Query("SELECT g FROM Goals g WHERE g.name =:name")
    Goals findByName(@Param("name") String name);
}
