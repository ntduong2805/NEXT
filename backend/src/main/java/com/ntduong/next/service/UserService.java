package com.ntduong.next.service;

import com.ntduong.next.dto.user.UserFavoriteReq;
import com.ntduong.next.dto.user.UserRegisterDto;
import com.ntduong.next.dto.user.UserLoginDto;
import com.ntduong.next.dto.user.UserResDto;
import com.ntduong.next.entity.UserEntity;

import java.util.List;
import java.util.Map;

public interface UserService {

    UserResDto userMapper(UserEntity user);
    UserResDto register(UserRegisterDto userCreateDto);
    Map<String, Object> login(UserLoginDto userLoginDto);
    UserResDto profile();
    String actionFavorite(UserFavoriteReq favoriteReq);
    List<Long> getFavorites(UserFavoriteReq userFavoriteReq);
}
