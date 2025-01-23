package com.fintech.h4_02.service.notification;

import com.fintech.h4_02.service.notification.event.OnGoalProgression;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GlobalEventPublisher {
    private final ApplicationEventPublisher applicationEventPublisher;

    public void publishGoalProgressionEvent(Long goalId) {
        applicationEventPublisher.publishEvent(new OnGoalProgression(this, goalId));
    }

}
