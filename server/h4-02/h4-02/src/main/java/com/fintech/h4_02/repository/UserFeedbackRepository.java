package com.fintech.h4_02.repository;

import com.fintech.h4_02.entity.UserFeedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserFeedbackRepository extends JpaRepository<UserFeedback, Long> {

}
