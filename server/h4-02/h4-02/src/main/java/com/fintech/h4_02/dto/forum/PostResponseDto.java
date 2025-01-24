package com.fintech.h4_02.dto.forum;

import com.fintech.h4_02.entity.Post;
import com.fintech.h4_02.entity.UserEntity;

import java.time.LocalDateTime;

public record PostResponseDto(Long id, String content, LocalDateTime createdAt, UserPostDto user) {

    public PostResponseDto(Post post) {
        this(post.getId(), post.getContent(), post.getCreatedAt(), new UserPostDto(post.getUser()));
    }

    public record UserPostDto(Long id, String name, String pictureUrl) {

        public UserPostDto(UserEntity user) {
            this(user.getId(), user.getName(), user.getPictureUrl());
        }

    }

}
