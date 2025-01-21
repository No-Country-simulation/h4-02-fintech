package com.fintech.h4_02.service;

import com.fintech.h4_02.dto.onboarding.OnboardingRequest;
import com.fintech.h4_02.dto.user.UserResponseDto;
import com.fintech.h4_02.entity.Goals;
import com.fintech.h4_02.entity.OnboardingEntity;
import com.fintech.h4_02.entity.UserEntity;
import com.fintech.h4_02.enums.KnowledgeLevel;
import com.fintech.h4_02.enums.RiskPreference;
import com.fintech.h4_02.exception.EntityNotFoundException;
import com.fintech.h4_02.repository.GoalRepository;
import com.fintech.h4_02.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OnboardingService {
    private final UserRepository userRepository;
    private final GoalRepository goalRepository;

    @Transactional
    public UserResponseDto createOrUpdateOnboarding(OnboardingRequest request) {
        UserEntity user = userRepository.findById(request.userId()).orElseThrow(() -> new EntityNotFoundException("User not found)"));
        OnboardingEntity onboarding = user.getOnboarding() == null ? new OnboardingEntity() : user.getOnboarding();

        if (request.knowledgeLevel() != null) {
            onboarding.setKnowledgeLevel(KnowledgeLevel.valueOf(request.knowledgeLevel().toUpperCase()));
        }
        if (request.goals() != null) {
            List<Goals> goals = new ArrayList<>();
            for (String g : request.goals()) {
                Goals goalDb = goalRepository.findByName(g);
                if (goalDb == null) {
                    goalDb = goalRepository.save((new Goals(g)));
                }
                goals.add(goalDb);
            }
            onboarding.setGoals(goals);
        }
        if (request.riskPreference() != null) {
            onboarding.setRiskPreference(RiskPreference.valueOf(request.riskPreference().toUpperCase()));
        }
        if (request.monthlyExpenses() != null) {
            onboarding.setMonthlyExpenses(new BigDecimal(request.monthlyExpenses()));
        }
        if (request.monthlyIncome() != null) {
            onboarding.setMonthlyIncome(new BigDecimal(request.monthlyIncome()));
        }
        if (request.savingsPercentage() != null) {
            onboarding.setSavingsPercentage(new BigDecimal(request.savingsPercentage()));
        }

        user.setOnboarding(onboarding);
        user = userRepository.save(user);

        return new UserResponseDto(user);
    }

}
