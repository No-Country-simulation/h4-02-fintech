package com.fintech.h4_02.dto.user;

import com.fintech.h4_02.entity.UserEntity;

public record UpdateUserProfileDto(
        String name,

        String dni,

        String phone,

        String address,

        String picture,

        boolean milestoneAchieved,

        boolean savingsGoalMet,

        boolean investmentOpportunities,

        boolean investmentExpirations,

        boolean dailyNotifications,

        boolean weeklyNotifications,

        boolean monthlyNotifications
) {

    public UpdateUserProfileDto(UserEntity user) {
        this(
                user.getName(),
                user.getDni(),
                user.getPhone(),
                user.getAddress(),
                user.getPictureUrl(),
                user.getNotifyMilestoneAchieved(),
                user.getNotifySavingsGoalMet(),
                user.getNotifyInvestmentOpportunities(),
                user.getNotifyInvestmentExpirations(),
                user.getDailyNotifications(),
                user.getWeeklyNotifications(),
                user.getMonthlyNotifications()
        );
    }

}
