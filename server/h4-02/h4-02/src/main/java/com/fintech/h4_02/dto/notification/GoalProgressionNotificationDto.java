package com.fintech.h4_02.dto.notification;

import com.fintech.h4_02.entity.GoalProgressionNotification;

import java.time.LocalDateTime;

public record GoalProgressionNotificationDto(
        Long id,

        String message,

        Boolean isRead,

        LocalDateTime createdAt,

        Long goalId
) {

    public GoalProgressionNotificationDto(GoalProgressionNotification notification) {
        this(
                notification.getId(),
                notification.getMessage(),
                notification.getIsRead(),
                notification.getCreatedAt(),
                notification.getGoal().getId()
        );
    }

}
