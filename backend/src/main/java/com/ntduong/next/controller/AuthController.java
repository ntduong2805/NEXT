package com.ntduong.next.controller;

import com.ntduong.next.dto.user.UserRegisterDto;
import com.ntduong.next.dto.user.UserLoginDto;
import com.ntduong.next.util.Response;

public interface AuthController {
    Response register(UserRegisterDto userCreateDto);

    Response login(UserLoginDto userLoginDto);
    Response profile();
}
