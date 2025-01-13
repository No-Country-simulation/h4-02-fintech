package com.fintech.h4_02.dto.auth;

import com.fintech.h4_02.dto.user.UserResponseDto;

public record AuthResponseDto(UserResponseDto user, String token) {

}
