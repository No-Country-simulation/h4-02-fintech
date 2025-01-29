package com.fintech.h4_02.controller;

import com.fintech.h4_02.dto.goal.CreateOrUpdateGoalDto;
import com.fintech.h4_02.dto.goal.GoalContributionDto;
import com.fintech.h4_02.dto.goal.GoalResponseDto;
import com.fintech.h4_02.entity.goal.Goal;
import com.fintech.h4_02.service.GoalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user/{userId}/goals")
@RequiredArgsConstructor
@Tag(name = "User Goals Management", description = "API for managing user goals and contributions.")
public class GoalController {
    private final GoalService goalService;

    @Operation(
            summary = "Get goals for a user",
            description = "Retrieves a list of goals associated with the given user ID."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Goals retrieved successfully.",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = GoalResponseDto.class)
                    )
            ),
    })
    @GetMapping
    private ResponseEntity<List<GoalResponseDto>> getGoals(@PathVariable Long userId) {
        List<Goal> goals = goalService.getGoals(userId);
        List<GoalResponseDto> goalListResponse = goals.stream().map(GoalResponseDto::new).toList();
        return ResponseEntity.ok(goalListResponse);
    }

    @Operation(
            summary = "Get already completed goals of a user",
            description = "Retrieves a list of completed goals associated with the given user ID."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Goal history retrieved successfully.",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = GoalResponseDto.class)
                    )
            ),
    })
    @GetMapping("/history")
    private ResponseEntity<List<GoalResponseDto>> getGoalsHistory(@PathVariable Long userId) {
        List<Goal> goals = goalService.getGoalHistory(userId);
        List<GoalResponseDto> goalListResponse = goals.stream().map(GoalResponseDto::new).toList();
        return ResponseEntity.ok(goalListResponse);
    }

    @Operation(
            summary = "Create a new goal",
            description = "Creates a new goal for the specified user."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "Goal created successfully.",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = GoalResponseDto.class)
                    )
            ),
    })
    @PostMapping
    public ResponseEntity<GoalResponseDto> createGoal(
            @PathVariable Long userId,
            @RequestBody @Valid CreateOrUpdateGoalDto dto
    ) {
        Goal goal = goalService.createGoal(userId, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new GoalResponseDto(goal));
    }

    @Operation(
            summary = "Update a goal",
            description = "Updates a goal with the request body fields."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Goal updated successfully.",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = GoalResponseDto.class)
                    )
            ),
    })
    @PutMapping("/{goalId}")
    public ResponseEntity<GoalResponseDto> updateGoal(
            @PathVariable String userId,
            @PathVariable Long goalId,
            @RequestBody CreateOrUpdateGoalDto dto
    ) {
        Goal updatedGoal = goalService.updateGoal(goalId, dto);
        return ResponseEntity.ok(new GoalResponseDto(updatedGoal));
    }

    @Operation(
            summary = "Add a contribution to a goal",
            description = "Adds a contribution to the specified goal for the given user."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Contribution added successfully.",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = GoalResponseDto.class)
                    )
            ),
    })
    @PostMapping("/{goalId}/contribution")
    public ResponseEntity<GoalResponseDto> addGoalContribution(
            @PathVariable String userId,
            @PathVariable Long goalId,
            @RequestBody @Valid GoalContributionDto dto
    ) {
        Goal goal = goalService.addGoalContribution(goalId, dto);
        return ResponseEntity.ok(new GoalResponseDto(goal));
    }

}
