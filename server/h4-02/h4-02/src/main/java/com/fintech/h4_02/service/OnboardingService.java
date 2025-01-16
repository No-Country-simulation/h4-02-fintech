package com.fintech.h4_02.service;

import com.fintech.h4_02.dto.onboarding.OnboardingRequest;
import com.fintech.h4_02.entity.Goals;
import com.fintech.h4_02.entity.OnboardingEntity;
import com.fintech.h4_02.entity.UserEntity;
import com.fintech.h4_02.enums.KnowledgeLevel;
import com.fintech.h4_02.enums.RiskPreference;
import com.fintech.h4_02.exception.EntityNotFoundException;
import com.fintech.h4_02.repository.GoalRepository;
import com.fintech.h4_02.repository.OnboardingRepository;
import com.fintech.h4_02.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class OnboardingService {

    @Autowired
    private OnboardingRepository onboardingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GoalRepository goalRepository;



    public UserEntity create(OnboardingRequest onboardingRequest) {

        UserEntity user = userRepository.findById(onboardingRequest.userId()).orElseThrow(() -> new EntityNotFoundException("user not found)"));

        OnboardingEntity onboarding = user.getOnboarding() == null ? new OnboardingEntity() : user.getOnboarding();

        if (onboardingRequest.knowledgeLevel() != null)
            onboarding.setKnowledgeLevel(KnowledgeLevel.valueOf(onboardingRequest.knowledgeLevel().toUpperCase()));

        if (onboardingRequest.goals() != null) {
            List<Goals> goals = new ArrayList<>();
            for (String g : onboardingRequest.goals()) {
                Goals goalDb = goalRepository.findByName(g);
                if(goalDb == null) goalDb = goalRepository.save((new Goals(g) ));
                goals.add(goalDb);
            }

            onboarding.setGoals(goals);
        }

        if (onboardingRequest.riskPreference() != null)
            onboarding.setRiskPreference(RiskPreference.valueOf(onboardingRequest.riskPreference().toUpperCase()));

        if (onboardingRequest.monthlyExpenses() != null)
            onboarding.setMonthlyExpenses(new BigDecimal(onboardingRequest.monthlyExpenses()));

        if (onboardingRequest.monthlyIncome() != null)
            onboarding.setMonthlyIncome(new BigDecimal(onboardingRequest.monthlyIncome()));

        if (onboardingRequest.savingsPercentage() != null)
            onboarding.setSavingsPercentage(new BigDecimal(onboardingRequest.savingsPercentage()));

        user.setOnboarding(onboarding);

        user = userRepository.save(user);
        return user;
    }
}
