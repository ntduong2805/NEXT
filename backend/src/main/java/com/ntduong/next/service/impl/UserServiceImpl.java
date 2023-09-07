package com.ntduong.next.service.impl;

import com.ntduong.next.dto.user.UserRegisterDto;
import com.ntduong.next.dto.user.UserLoginDto;
import com.ntduong.next.dto.user.UserResponseDto;
import com.ntduong.next.entity.Role;
import com.ntduong.next.entity.UserEntity;
import com.ntduong.next.repository.UserRepository;
import com.ntduong.next.service.UserService;
import com.ntduong.next.util.UserProfileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtServiceImpl jwtService;
    private PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();

    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public UserResponseDto userMapper(UserEntity user) {
        return UserResponseDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .username(user.getEmail())
                .build();
    }

    @Override
    public UserResponseDto register(UserRegisterDto userCreateDto) {

        UserEntity newUser = userRepository.save(
                UserEntity.builder()
                        .username(userCreateDto.getUsername())
                        .email(userCreateDto.getEmail())
                        .password(passwordEncoder.encode(userCreateDto.getPassword()))
                        .roles(Collections.singleton(Role.USER))
                        .build()
        );
        return userMapper(newUser);
    }

    @Override
    public Map<String, Object> login(UserLoginDto userLoginDto) {
        if (Objects.isNull(userLoginDto)) throw new RuntimeException("Something went wrong");
        if (userLoginDto.getEmail().isEmpty()) throw new RuntimeException("Email is not null!");
        if (userLoginDto.getPassword().isEmpty()) throw new RuntimeException("Password is not null!");
        Map<String, Object> req = new HashMap<>();
        UserEntity user = userRepository.getUserByEmail(userLoginDto.getEmail());
        if (Objects.nonNull(user) && passwordEncoder.matches(userLoginDto.getPassword(), user.getPassword())) {
            String idRefreshToken = jwtService.generateToken(userLoginDto.getEmail());
            req.put("id_refresh_token", idRefreshToken);
            req.put("user", user);

        } else {
            req.put("message", "Incorrect email or password");
        }
        return req;
    }

    @Override
    public UserResponseDto profile() {
        Long userId = UserProfileUtils.getUserId();
        UserResponseDto userResponseDto = new UserResponseDto();
        UserEntity user = userRepository.getById(userId);

        if (Objects.isNull(user)) {
            throw new RuntimeException("User not found!");
        }

        userResponseDto.setId(user.getId());
        userResponseDto.setEmail(user.getEmail());
        userResponseDto.setUsername(user.getUsername());

        return userResponseDto;
    }

}
