package com.fintech.h4_02.service;

import com.fintech.h4_02.dto.goal.GoalResponseDto;
import com.fintech.h4_02.dto.user.UpdateUserProfileDto;
import com.fintech.h4_02.dto.user.UserRadiographyFinancial;
import com.fintech.h4_02.dto.user.UserResponseDto;
import com.fintech.h4_02.entity.UserEntity;
import com.fintech.h4_02.entity.goal.Goal;
import com.fintech.h4_02.exception.EntityNotFoundException;
import com.fintech.h4_02.repository.UserRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserEntity getUserByEmail(String email) {
        return userRepository
                .findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found with email: " + email));
    }

    public UserEntity getUserById(@Valid @NotNull Long id) {
        return userRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + id));
    }

    @Transactional
    public UserEntity updateUserProfile(Long userId, UpdateUserProfileDto dto) {
        UserEntity user = getUserById(userId);

        user.setName(dto.name());
        user.setDni(dto.dni());
        user.setPhone(dto.phone());
        user.setAddress(dto.address());
        user.setPictureUrl(dto.picture());
        user.setNotifyMilestoneAchieved(dto.milestoneAchieved());
        user.setNotifySavingsGoalMet(dto.savingsGoalMet());
        user.setNotifyInvestmentOpportunities(dto.investmentOpportunities());
        user.setNotifyInvestmentExpirations(dto.investmentExpirations());
        user.setDailyNotifications(dto.dailyNotifications());
        user.setWeeklyNotifications(dto.weeklyNotifications());
        user.setMonthlyNotifications(dto.monthlyNotifications());

        return userRepository.save(user);
    }

    public UserRadiographyFinancial getUseFinancialXRay(Long id) {



        UserEntity user = userRepository.findById(id).orElseThrow( ()-> new EntityNotFoundException("user not found"));

        List<Goal> goal = user.getGoals();
        List<GoalResponseDto> goalDto = new ArrayList<>();
        if(!goal.isEmpty()) goalDto = goal.stream().map(GoalResponseDto::new).toList();


       Optional<BigDecimal>  ingresos = userRepository.findIngresosByUser(user);
        Optional<BigDecimal> egresos = userRepository.findEgresosByUser(user);

        UserRadiographyFinancial radiography =  UserRadiographyFinancial.builder()
                .user(new UserResponseDto(user))
                .goal(goalDto)
                .ingresos(ingresos.get())
                .egresos(egresos.get())
                .build();

        return radiography;
    }
}
