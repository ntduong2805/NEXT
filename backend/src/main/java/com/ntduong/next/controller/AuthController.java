package com.ntduong.next.controller;

import com.ntduong.next.dto.user.UserFavoriteReq;
import com.ntduong.next.dto.user.UserRegisterDto;
import com.ntduong.next.dto.user.UserLoginDto;
import com.ntduong.next.util.Response;

public interface AuthController {
    Response register(UserRegisterDto userCreateDto);

    Response login(UserLoginDto userLoginDto);
    Response profile();

    Response addFavorite(UserFavoriteReq favoriteReq);
    Response getFavorites(UserFavoriteReq userFavoriteReq);
}
