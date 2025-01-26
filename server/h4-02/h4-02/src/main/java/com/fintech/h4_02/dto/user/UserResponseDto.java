package com.fintech.h4_02.dto.user;

import com.fintech.h4_02.entity.OnboardingEntity;
import com.fintech.h4_02.entity.Role;
import com.fintech.h4_02.entity.UserEntity;

import java.util.Set;

public record UserResponseDto(
        Long id,

        String email,

        String name,

        String dni,

        Set<Role> roles,

        UserEntity.OAuthProvider oauthProvider,

        Set<String> unlockedAvatars,

        String picture,

        String phone,

        String address,

        boolean notifyMilestoneAchieved,

        boolean notifySavingsGoalMet,

        boolean notifyInvestmentOpportunities,

        boolean notifyInvestmentExpirations,

        boolean dailyNotifications,

        boolean weeklyNotifications,

        boolean monthlyNotifications,

        OnboardingEntity onboarding
) {

    public UserResponseDto(UserEntity user) {
        this(
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getDni(),
                user.getRoles(),
                user.getProvider(),
                user.getUnlockedAvatars(),
                user.getPictureUrl(),
                user.getPhone(),
                user.getAddress(),
                user.getNotifySavingsGoalMet(),
                user.getNotifySavingsGoalMet(),
                user.getNotifyInvestmentOpportunities(),
                user.getNotifyInvestmentExpirations(),
                user.getDailyNotifications(),
                user.getWeeklyNotifications(),
                user.getMonthlyNotifications(),
                user.getOnboarding()
        );
    }

}
