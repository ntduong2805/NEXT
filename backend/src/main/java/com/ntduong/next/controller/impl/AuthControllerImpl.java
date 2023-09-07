package com.ntduong.next.controller.impl;
import com.ntduong.next.controller.AuthController;
import com.ntduong.next.dto.user.UserRegisterDto;
import com.ntduong.next.dto.user.UserLoginDto;
import com.ntduong.next.dto.user.UserResponseDto;
import com.ntduong.next.service.impl.JwtServiceImpl;
import com.ntduong.next.service.impl.UserServiceImpl;
import com.ntduong.next.util.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v2/auth")
public class AuthControllerImpl implements AuthController {

    @Autowired
    UserServiceImpl userService;

    @Autowired
    JwtServiceImpl jwtService;


    @PostMapping("/register")
    public Response register(@RequestBody UserRegisterDto userCreateDto) {
        long start = System.currentTimeMillis();
        return new Response(userService.register(userCreateDto), start);
    }

    @PostMapping("/login")
    public Response login(@RequestBody UserLoginDto userLoginDto) {
        long start = System.currentTimeMillis();
        try {
            Map<String, Object> success = userService.login(userLoginDto);
            return new Response(success, start);
        } catch (Exception e){
            return new Response(400, e.getMessage(), start);
        }
    }
    @PostMapping("/profile")
    @Override
    public Response profile() {
        long start = System.currentTimeMillis();
        try {
            UserResponseDto user = userService.profile();
            return new Response(user, start);
        } catch (Exception e) {
            return new Response(400, e.getMessage(), start);
        }
    }
}