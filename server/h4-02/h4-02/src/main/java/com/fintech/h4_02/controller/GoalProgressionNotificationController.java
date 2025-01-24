package com.fintech.h4_02.controller;

import com.fintech.h4_02.dto.notification.GoalProgressionNotificationDto;
import com.fintech.h4_02.dto.notification.MultipleNotificationIdsDto;
import com.fintech.h4_02.entity.GoalProgressionNotification;
import com.fintech.h4_02.service.notification.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user/{userId}/notification")
@RequiredArgsConstructor
@Tag(name = "User Notifications Management", description = "API for managing goal progression notifications for users.")
public class GoalProgressionNotificationController {
    private final NotificationService notificationService;

    @Operation(
            summary = "Get notifications for a user",
            description = "Retrieves a paginated list of goal progression notifications for the specified user."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Notifications retrieved successfully.",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = GoalProgressionNotificationDto.class)
                    )),
    })
    @GetMapping
    public ResponseEntity<List<GoalProgressionNotificationDto>> getNotificationsOfUser(
            @PathVariable
            Long userId,

            @PageableDefault(value = 15, sort = {"createdAt"}, direction = Sort.Direction.DESC)
            Pageable pageable
    ) {
        List<GoalProgressionNotification> notificationsOfUser = notificationService.getNotificationsOfUser(userId, pageable);
        return ResponseEntity.ok(notificationsOfUser.stream().map(GoalProgressionNotificationDto::new).toList());
    }

    @Operation(
            summary = "Mark a notification as read",
            description = "Marks a specific goal progression notification as read for the specified user."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "204",
                    description = "Notification marked as read successfully.",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE)
            ),
    })
    @PostMapping("/{notificationId}/mark-as-read")
    public ResponseEntity<Void> markNotificationAsRead(
            @PathVariable String userId,
            @PathVariable Long notificationId
    ) {
        notificationService.markGoalProgressionNotificationAsRead(notificationId);
        return ResponseEntity.noContent().build();
    }

    @Operation(
            summary = "Mark multiple notifications as read",
            description = "Marks the specified notifications as read."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "204",
                    description = "Notifications marked as read successfully.",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE)
            ),
    })
    @PostMapping("/mark-as-read")
    public ResponseEntity<Void> markMultipleNotificationsAsRead(
            @PathVariable String userId,
            @RequestBody @Valid MultipleNotificationIdsDto dto
    ) {
        notificationService.markMultipleGoalProgressionNotificationsAsRead(dto.notificationIds());
        return ResponseEntity.noContent().build();
    }

}
