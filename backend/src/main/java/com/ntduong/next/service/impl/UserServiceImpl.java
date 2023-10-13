package com.ntduong.next.service.impl;

import com.ntduong.next.dto.user.UserFavoriteReq;
import com.ntduong.next.dto.user.UserRegisterDto;
import com.ntduong.next.dto.user.UserLoginDto;
import com.ntduong.next.dto.user.UserResDto;
import com.ntduong.next.entity.Role;
import com.ntduong.next.entity.UserEntity;
import com.ntduong.next.entity.UserFavoriteEntity;
import com.ntduong.next.exception.DetailException;
import com.ntduong.next.repository.UserFavoriteRepository;
import com.ntduong.next.repository.UserRepository;
import com.ntduong.next.service.UserService;
import com.ntduong.next.util.UserProfileUtils;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserFavoriteRepository userFavoriteRepository;

    @Autowired
    JwtServiceImpl jwtService;
    private PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();

    @Override
    public UserResDto userMapper(UserEntity user) {
        return UserResDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .build();
    }

    @Override
    public UserResDto register(UserRegisterDto userCreateDto) {
        UserEntity newUser = userRepository.save(
                UserEntity.builder()
                        .username(userCreateDto.getUsername())
                        .email(userCreateDto.getEmail())
                        .password(passwordEncoder.encode(userCreateDto.getPassword()))
                        .roles(new ArrayList<>(Collections.singleton(Role.USER)))
                        .build()
        );
        return userMapper(newUser);
    }


    @Override
    public Map<String, Object> login(UserLoginDto userLoginDto) {
        if (Objects.isNull(userLoginDto)) throw new DetailException("Something went wrong");
        if (userLoginDto.getEmail().isEmpty()) throw new DetailException("Email is not null!");
        if (userLoginDto.getPassword().isEmpty()) throw new DetailException("Password is not null!");
        Map<String, Object> req = new HashMap<>();
        UserEntity user = userRepository.getUserByEmail(userLoginDto.getEmail());
        UserResDto userRes = new UserResDto(user.getId(), user.getEmail(), user.getUsername());
        if (Objects.nonNull(user) && passwordEncoder.matches(userLoginDto.getPassword(), user.getPassword())) {
            String idRefreshToken = jwtService.generateToken(userLoginDto.getEmail());
            req.put("token", idRefreshToken);
            req.put("user", userRes);

        } else {
            throw new DetailException("Incorrect email or password");
        }
        return req;
    }

    @Override
    public UserResDto profile() {
        Long userId = UserProfileUtils.getUserId();
        UserResDto userResponseDto = new UserResDto();
        UserEntity user = userRepository.getById(userId);

        if (Objects.isNull(user)) {
            throw new DetailException("User not found!");
        }

        userResponseDto.setId(user.getId());
        userResponseDto.setEmail(user.getEmail());
        userResponseDto.setUsername(user.getUsername());

        return userResponseDto;
    }

    @Override
    @Transactional(readOnly = false, rollbackFor = Exception.class)
    public String actionFavorite(UserFavoriteReq favoriteReq) {
        String res = "Success";
        if (ObjectUtils.isEmpty(favoriteReq.getUserId())) {
            throw new DetailException("User id is not null");
        }
        if (ObjectUtils.isEmpty(favoriteReq.getListingId())) {
            throw new DetailException("Listing id is not null");
        }
        try {
            List<Long> userFavorites = userFavoriteRepository.getListingIdByUserId(favoriteReq.getUserId());
            if (userFavorites.contains(favoriteReq.getListingId())) {
                userFavoriteRepository.deleteUserFavoriteEntityByListingIdAndAndUserId(favoriteReq.getListingId(), favoriteReq.getUserId());
            } else {
                UserFavoriteEntity userFavorite = new UserFavoriteEntity();
                userFavorite.setUserId(favoriteReq.getUserId());
                userFavorite.setListingId(favoriteReq.getListingId());
                userFavoriteRepository.save(userFavorite);
            }
            return res;
        } catch (Exception e) {
            throw new DetailException(e.getMessage());
        }
    }

    @Override
    public List<Long> getFavorites(UserFavoriteReq userFavoriteReq) {
        if (ObjectUtils.isEmpty(userFavoriteReq.getUserId())) {
            throw new DetailException("User Id is not null");
        }
        List<Long> favorites = userFavoriteRepository.getListingIdByUserId(userFavoriteReq.getUserId());
        return favorites;
    }


}
