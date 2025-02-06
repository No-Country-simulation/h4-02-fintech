package com.fintech.h4_02.service.notification;

import com.fintech.h4_02.entity.GoalProgressionNotification;
import com.fintech.h4_02.entity.goal.Goal;
import com.fintech.h4_02.exception.EntityNotFoundException;
import com.fintech.h4_02.repository.GoalProgressionNotificationRepository;
import com.fintech.h4_02.service.GoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final GoalProgressionNotificationRepository notificationRepository;
    private final GoalService goalService;

    public List<GoalProgressionNotification> getNotificationsOfUser(Long userId, Pageable pageable) {
        return notificationRepository.findAllByUserId(userId, pageable);
    }

    @Transactional
    public void saveGoalProgressionNotification(Long goalId) {
        Goal goal = goalService.getGoalByIdOrThrow(goalId);
        var progression = GoalProgressionNotification.ProgressionMapping.progressionFrom(goal.getProgress());
        int lowerBoundPercentage = progression.getLowerBoundPercentage();
        if (lowerBoundPercentage == 0) {
            return;
        }
        // This is to prevent duplicate notifications
        if (notificationRepository.existsByLowerBoundPercentageAndGoalId(lowerBoundPercentage, goalId)) {
            return;
        }

        var notification = new GoalProgressionNotification();
        notification.setLowerBoundPercentage(lowerBoundPercentage);
        notification.setMessage(progression.getMessage());
        notification.setIsRead(false);
        notification.setGoal(goal);
        notification.setCreatedAt(LocalDateTime.now());

        notificationRepository.save(notification);
    }

    @Transactional
    public void markGoalProgressionNotificationAsRead(Long notificationId) {
        var notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new EntityNotFoundException("Notification not found."));
        notification.setIsRead(true);
        notificationRepository.save(notification);
    }

    @Transactional
    public void markMultipleGoalProgressionNotificationsAsRead(List<Long> notificationsIds) {
        notificationRepository.markNotificationsAsReadByIds(notificationsIds);
    }

}
