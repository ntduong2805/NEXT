package com.ntduong.next.service;

import com.ntduong.next.dto.user.UserRegisterDto;
import com.ntduong.next.dto.user.UserLoginDto;
import com.ntduong.next.dto.user.UserResponseDto;
import com.ntduong.next.entity.UserEntity;

import java.util.Map;

public interface UserService {

    UserResponseDto userMapper(UserEntity user);
    UserResponseDto register(UserRegisterDto userCreateDto);
    Map<String, Object> login(UserLoginDto userLoginDto);
    UserResponseDto profile();
}
