package com.fintech.h4_02.dto.comment;

import com.fintech.h4_02.dto.queries.QueryResponse;
import com.fintech.h4_02.dto.user.UserResponseSimple;
import com.fintech.h4_02.entity.CommentEntity;

public record CommentResponse(
        long id,
        QueryResponse query,
        String date,
        String description,
        UserResponseSimple user
) {
    public CommentResponse(CommentEntity comment) {
        this(comment.getId(), new QueryResponse(comment.getQuery() ),
                comment.getDate().toString(), comment.getDescription(),
                new UserResponseSimple(comment.getUser()));
    }
}
