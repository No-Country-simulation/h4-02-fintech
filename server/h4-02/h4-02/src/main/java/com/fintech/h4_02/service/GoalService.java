package com.fintech.h4_02.service;

import com.fintech.h4_02.dto.goal.CreateOrUpdateGoalDto;
import com.fintech.h4_02.dto.goal.GoalContributionDto;
import com.fintech.h4_02.entity.UserEntity;
import com.fintech.h4_02.entity.goal.Goal;
import com.fintech.h4_02.entity.goal.GoalContribution;
import com.fintech.h4_02.exception.EntityNotFoundException;
import com.fintech.h4_02.repository.goal.GoalContributionRepository;
import com.fintech.h4_02.repository.goal.GoalRepository;
import com.fintech.h4_02.service.notification.GlobalEventPublisher;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GoalService {
    private final GoalRepository goalRepository;
    private final GoalContributionRepository goalContributionRepository;
    private final UserService userService;
    private final GlobalEventPublisher eventPublisher;

    public Goal getGoalByIdOrThrow(Long goalId) {
        return goalRepository
                .findById(goalId)
                .orElseThrow(() -> new EntityNotFoundException("Goal with id " + goalId + " not found"));
    }

    public List<Goal> getGoalHistory(Long userId) {
        UserEntity userEntity = userService.getUserById(userId);
        return goalRepository.findAllByUserWithFullProgress(userEntity);
    }

    public List<Goal> getGoals(Long userId) {
        UserEntity user = userService.getUserById(userId);
        return user.getGoals();
    }

    @Transactional
    public Goal createGoal(Long userId, CreateOrUpdateGoalDto dto) {
        UserEntity user = userService.getUserById(userId);

        Goal goal = new Goal(dto.goalName());
        goal.setCategory(dto.category());
        goal.setDesiredAmount(dto.desiredAmount());
        goal.setDeadline(dto.deadline());
        user.addGoal(goal);

        return goalRepository.save(goal);
    }

    @Transactional
    public Goal updateGoal(Long goalId, CreateOrUpdateGoalDto dto) {
        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() -> new EntityNotFoundException("Goal with id: " + goalId + " not found"));

        goal.setName(dto.goalName());
        goal.setDeadline(dto.deadline());
        goal.setCategory(dto.category());
        goal.setDesiredAmount(dto.desiredAmount());
        goal.setProgress(dto.desiredAmount());

        return goalRepository.save(goal);
    }

    @Transactional
    public Goal addGoalContribution(Long goalId, GoalContributionDto dto) {
        Goal goal = getGoalByIdOrThrow(goalId);

        GoalContribution goalContribution = new GoalContribution();
        goalContribution.setAmount(dto.amount());
        goal.addGoalContribution(goalContribution);
        goal.setProgress(goalContributionRepository.findTotalAmountByGoalId(goalId));

        // If the contribution is positive, publish a progress event
        if (dto.amount().compareTo(BigDecimal.ZERO) > 0) {
            eventPublisher.publishGoalProgressionEvent(goal.getId());
        }
        // If the goal is completed, increment the user's completed goals count
        if (goal.isCompleted()) {
            UserEntity user = goal.getUser();
            user.incrementUserCompletedGoalCount();
        }

        return goalRepository.save(goal);
    }

}
