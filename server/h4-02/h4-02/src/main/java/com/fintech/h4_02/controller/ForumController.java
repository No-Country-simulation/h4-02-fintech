package com.fintech.h4_02.controller;

import com.fintech.h4_02.config.security.LoggedUser;
import com.fintech.h4_02.config.security.SecurityUserDetails;
import com.fintech.h4_02.dto.forum.CreatePostDto;
import com.fintech.h4_02.dto.forum.PostResponseDto;
import com.fintech.h4_02.entity.Post;
import com.fintech.h4_02.service.ForumService;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/forum")
@RequiredArgsConstructor
@Tag(name = "Forum", description = "Endpoints for managing forum posts")
public class ForumController {
    private final ForumService forumService;

    @Operation(
            summary = "Get the latest posts",
            description = "Fetches the latest 50 posts, sorted by creation date in descending order."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200",
                    description = "Successfully retrieved the list of posts",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = PostResponseDto.class)
                    )),
    })
    @GetMapping
    public ResponseEntity<List<PostResponseDto>> getLatestPosts(
            @PageableDefault(size = 50, sort = {"createdAt"}, direction = Sort.Direction.DESC)
            Pageable pageable
    ) {
        List<Post> posts = forumService.getLatestPosts(pageable);
        return ResponseEntity.ok(posts.stream().map(PostResponseDto::new).toList());
    }

    @Operation(
            summary = "Publish a new post",
            description = "Allows an authenticated user to create a new post in the forum."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "Post successfully created",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = PostResponseDto.class)
                    )),
    })
    @PostMapping("/publish")
    public ResponseEntity<PostResponseDto> publishPost(
            @LoggedUser SecurityUserDetails userDetails,
            @RequestBody @Valid CreatePostDto dto
    ) {
        Post post = forumService.publishPost(userDetails.getId(), dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new PostResponseDto(post));
    }

}
