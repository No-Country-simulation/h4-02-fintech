package com.fintech.h4_02.dto.notification;

import jakarta.validation.constraints.NotNull;

import java.util.List;

public record MultipleNotificationIdsDto(
        @NotNull
        List<Long> notificationIds
) {

}
