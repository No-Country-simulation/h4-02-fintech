package com.fintech.h4_02.service.notification.event;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class OnGoalProgression extends ApplicationEvent {
    private final Long goalId;

    public OnGoalProgression(Object source, Long goalId) {
        super(source);
        this.goalId = goalId;
    }

}
