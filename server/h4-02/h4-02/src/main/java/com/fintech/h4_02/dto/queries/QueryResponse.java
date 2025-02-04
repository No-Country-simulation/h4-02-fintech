package com.fintech.h4_02.dto.queries;

import com.fintech.h4_02.dto.user.UserResponseDto;
import com.fintech.h4_02.dto.user.UserResponseSimple;
import com.fintech.h4_02.entity.CommentEntity;
import com.fintech.h4_02.entity.QueryEntity;
import com.fintech.h4_02.entity.UserEntity;
import com.fintech.h4_02.enums.QueriesState;

import java.util.List;

public record QueryResponse(
        long id,
        UserResponseSimple user,
        String date,
        String description,
        QueriesState state,
        List<CommentEntity> comments
) {

    public QueryResponse(QueryEntity query) {
        this(query.getId(), new UserResponseSimple(query.getUser()), query.getDate().toString(), query.getDescription(), query.getState(),query.getComments());
    }

}
