package com.fintech.h4_02.service.notification;

import com.fintech.h4_02.service.notification.event.OnGoalProgression;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationListener;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

@Component
public class GlobalEventListener {

    @Component
    @RequiredArgsConstructor
    public static class GoalProgression implements ApplicationListener<OnGoalProgression> {
        private final NotificationService notificationService;

        @Override
        public void onApplicationEvent(@NonNull OnGoalProgression event) {
            notificationService.saveGoalProgressionNotification(event.getGoalId());
        }

    }

}
