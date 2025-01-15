package com.fintech.h4_02.service;

import com.fintech.h4_02.dto.onboarding.OnboardingRequest;
import com.fintech.h4_02.entity.Goals;
import com.fintech.h4_02.entity.OnboardingEntity;
import com.fintech.h4_02.entity.UserEntity;
import com.fintech.h4_02.enums.KnowledgeLevel;
import com.fintech.h4_02.enums.RiskPreference;
import com.fintech.h4_02.exception.EntityNotFoundException;
import com.fintech.h4_02.repository.OnboardingRepository;
import com.fintech.h4_02.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OnboardingService {

    @Autowired
    private OnboardingRepository onboardingRepository;

    @Autowired
    private UserRepository userRepository;


    public UserEntity create(OnboardingRequest onboardingRequest) {

        UserEntity user = userRepository.findById(onboardingRequest.userId()).orElseThrow(() -> new EntityNotFoundException("user not found)"));

        OnboardingEntity onboarding = user.getOnboarding() == null ? new OnboardingEntity() : user.getOnboarding();

        if (onboardingRequest.knowledgeLevel() != null)
            onboarding.setKnowledgeLevel(KnowledgeLevel.valueOf(onboardingRequest.knowledgeLevel().toUpperCase()));

        if (onboardingRequest.goals() != null) {
            onboarding.setGoals(onboardingRequest.goals().stream().map(Goals::new).collect(Collectors.toSet()));
        }

        if (onboardingRequest.riskPreference() != null)
            onboarding.setRiskPreference(RiskPreference.valueOf(onboardingRequest.riskPreference().toUpperCase()));

        if (onboardingRequest.monthlyExpenses() != null)
            onboarding.setMonthlyExpenses(onboardingRequest.monthlyExpenses());

        if (onboardingRequest.monthlyIncome() != null) onboarding.setMonthlyExpenses(onboardingRequest.monthlyIncome());

        if (onboardingRequest.savingsPercentage() != null)
            onboarding.setMonthlyExpenses(onboardingRequest.savingsPercentage());

        user.setOnboarding(onboarding);

       // user = userRepository.findByUser(user);
        return user;
    }
}
