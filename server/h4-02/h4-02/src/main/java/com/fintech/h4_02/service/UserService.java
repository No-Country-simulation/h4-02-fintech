package com.fintech.h4_02.service;

import com.fintech.h4_02.dto.User.UserCreated;
import com.fintech.h4_02.dto.User.UsercreatedResponse;
import com.fintech.h4_02.entity.UserEntity;
import com.fintech.h4_02.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    public UsercreatedResponse createUser(UserCreated user) {
        UserEntity userCreated = userRepository.save(new UserEntity(user) );
        return new UsercreatedResponse(userCreated);
    }
}
