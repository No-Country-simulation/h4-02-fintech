package com.fintech.h4_02.controller;

import com.fintech.h4_02.dto.feedback.UserFeedbackRequest;
import com.fintech.h4_02.dto.feedback.UserFeedbackResponse;
import com.fintech.h4_02.entity.UserFeedback;
import com.fintech.h4_02.service.UserFeedbackService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/feedback")
@RequiredArgsConstructor
@Tag(name = "User Feedback Management", description = "Endpoints for managing user feedbacks")
public class UserFeedbackController {
    private final UserFeedbackService feedbackService;

    @Operation(
            summary = "Get all feedbacks",
            description = "Retrieves a list of all user feedback entries"
    )
    @GetMapping
    @RolesAllowed("ADMIN")
    public ResponseEntity<List<UserFeedbackResponse>> getAllFeedbacks() {
        List<UserFeedbackResponse> list = feedbackService.getAllFeedbacks().stream()
                .map(UserFeedbackResponse::new)
                .toList();
        return ResponseEntity.ok(list);
    }

    @Operation(
            summary = "Get feedback by ID",
            description = "Retrieves a specific feedback entry by its ID"
    )
    @GetMapping("/{id}")
    @RolesAllowed("ADMIN")
    public ResponseEntity<UserFeedbackResponse> getFeedbackById(@PathVariable Long id) {
        UserFeedbackResponse userFeedbackResponse = new UserFeedbackResponse(feedbackService.getFeedbackById(id));
        return ResponseEntity.ok(userFeedbackResponse);
    }

    @Operation(
            summary = "Create new feedback",
            description = "Creates a new user feedback entry (incident or recommendation)"
    )
    @ApiResponse(responseCode = "201", description = "Feedback created successfully")
    @PostMapping
    public ResponseEntity<UserFeedbackResponse> createFeedback(@RequestBody @Valid UserFeedbackRequest request) {
        UserFeedback feedback = feedbackService.createFeedback(
                UserFeedback.builder()
                        .title(request.title())
                        .content(request.content())
                        .feedbackType(request.feedbackType())
                        .build()
        );
        return ResponseEntity.ok(new UserFeedbackResponse(feedback));
    }

}
