package com.fintech.h4_02.service;

import com.fintech.h4_02.dto.forum.CreatePostDto;
import com.fintech.h4_02.entity.Post;
import com.fintech.h4_02.entity.UserEntity;
import com.fintech.h4_02.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ForumService {
    private final PostRepository postRepository;
    private final UserService userService;

    @Transactional(readOnly = true)
    public List<Post> getLatestPosts(Pageable pageable) {
        return postRepository.findAll(pageable).getContent();
    }

    @Transactional
    public Post publishPost(Long userId, CreatePostDto dto) {
        UserEntity user = userService.getUserById(userId);
        Post post = new Post();
        post.setContent(dto.content());
        post.setCreatedAt(LocalDateTime.now(ZoneOffset.UTC));
        user.addPost(post);
        return postRepository.save(post);
    }

}
