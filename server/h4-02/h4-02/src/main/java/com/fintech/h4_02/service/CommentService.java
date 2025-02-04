package com.fintech.h4_02.service;

import com.fintech.h4_02.dto.comment.CommentRequest;
import com.fintech.h4_02.dto.comment.CommentResponse;
import com.fintech.h4_02.entity.CommentEntity;
import com.fintech.h4_02.entity.QueryEntity;
import com.fintech.h4_02.entity.UserEntity;
import com.fintech.h4_02.exception.EntityNotFoundException;
import com.fintech.h4_02.repository.CommentRepository;
import com.fintech.h4_02.repository.QueryRepository;
import com.fintech.h4_02.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private QueryRepository queryRepository;

    @Autowired
    private UserRepository userRepository;

    public CommentResponse create(CommentRequest commentRequest) {
        QueryEntity query = queryRepository.findById(commentRequest.queryId()).orElseThrow( ()-> new EntityNotFoundException("query not found"));
        UserEntity user = userRepository.findById(commentRequest.userId()).orElseThrow( ()-> new EntityNotFoundException("user not found"));

        CommentEntity comment = CommentEntity.builder()
                .date(LocalDate.now())
                .description(commentRequest.description())
                .query(query)
                .user(user)
                .build();
        comment = commentRepository.save(comment);
        return new CommentResponse(comment);
    }
}
