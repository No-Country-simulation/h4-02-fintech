package com.fintech.h4_02.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fintech.h4_02.dto.user.FinancialProfileDto;
import com.fintech.h4_02.dto.user.UserFinancialRadiography;
import com.fintech.h4_02.entity.FinancialProfile;
import com.fintech.h4_02.entity.UserEntity;
import com.fintech.h4_02.exception.EntityNotFoundException;
import com.fintech.h4_02.repository.ExchangeRepository;
import com.fintech.h4_02.repository.FinancialProfileRepository;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FinancialProfileService {
    private final UserService userService;
    private final FinancialProfileRepository financialProfileRepository;
    private final ExchangeRepository exchangeRepository;

    public FinancialProfileDto getFinancialProfile(Long userId) throws JSONException, JsonProcessingException {
        FinancialProfile financialProfile = financialProfileRepository.findFinancialProfileByUserId(userId)
                .orElseThrow(() -> new EntityNotFoundException("Financial profile for user with id: " + userId + " not found!"));
        UserFinancialRadiography financialRadiography = userService.calculateUserFinancialXRay(userId);
        Long totalInvestments = exchangeRepository.getTotalInvestmentsForUser(userId);
        return FinancialProfileDto.builder()
                .ageRange(financialProfile.getAgeRange())
                .evolutionTool(financialProfile.getEvolutionTool())
                .insurance(financialProfile.getInsurance())
                .totalBalance(financialRadiography.balance().values())
                .savings(financialRadiography.savings().values())
                .investments(totalInvestments)
                .build();
    }

    @Transactional
    public FinancialProfileDto createOrUpdateFinancialProfile(Long userId, FinancialProfileDto dto) {
        UserEntity user = userService.getUserById(userId);
        FinancialProfile financialProfile = user.getFinancialProfile() == null ? new FinancialProfile() : user.getFinancialProfile();

        financialProfile.setAgeRange(dto.ageRange());
        financialProfile.setEvolutionTool(dto.evolutionTool());
        financialProfile.setInsurance(dto.insurance());
        user.setFinancialProfile(financialProfile);
        financialProfile.setUser(user);

        FinancialProfile savedFinancialProfile = financialProfileRepository.save(financialProfile);
        return FinancialProfileDto.builder()
                .ageRange(savedFinancialProfile.getAgeRange())
                .evolutionTool(savedFinancialProfile.getEvolutionTool())
                .insurance(savedFinancialProfile.getInsurance())
                .build();
    }

}
