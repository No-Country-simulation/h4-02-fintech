package com.fintech.h4_02.service;

import com.fintech.h4_02.dto.onboarding.OnboardingRequest;
import com.fintech.h4_02.entity.Goals;
import com.fintech.h4_02.entity.OnboardingEntity;
import com.fintech.h4_02.enums.KnowledgeLevel;
import com.fintech.h4_02.enums.RiskPreference;
import com.fintech.h4_02.repository.OnboardingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class OnboardingService {

    @Autowired
    private OnboardingRepository onboardingRepository;


    public OnboardingEntity create(OnboardingRequest onboardingRequest) {
        OnboardingEntity onboarding = new OnboardingEntity();
        if (onboardingRequest.knowledgeLevel() != null) onboarding.setKnowledgeLevel(KnowledgeLevel.valueOf(onboardingRequest.knowledgeLevel() ));

        if(!onboardingRequest.goals().isEmpty()){
            onboarding.setGoals(onboardingRequest.goals().stream().map(Goals::new).collect(Collectors.toSet()));
        }

        if (onboardingRequest.riskPreference() != null) onboarding.setRiskPreference(RiskPreference.valueOf(onboardingRequest.riskPreference()));

        if (onboardingRequest.monthlyExpenses() != null) onboarding.setMonthlyExpenses(onboardingRequest.monthlyExpenses());

        if (onboardingRequest.monthlyIncome() != null) onboarding.setMonthlyExpenses(onboardingRequest.monthlyIncome());

        if (onboardingRequest.savingsPercentage() != null) onboarding.setMonthlyExpenses(onboardingRequest.savingsPercentage());

        return onboarding;
    }
}
