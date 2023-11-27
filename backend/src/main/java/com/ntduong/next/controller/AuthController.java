package com.ntduong.next.controller;

import com.ntduong.next.dto.otp.OTPReqDto;
import com.ntduong.next.dto.user.UserFavoriteReq;
import com.ntduong.next.dto.user.UserSettingReqDto;
import com.ntduong.next.dto.user.UserRegisterDto;
import com.ntduong.next.dto.user.UserLoginDto;
import com.ntduong.next.dto.user.UserReqDto;
import com.ntduong.next.dto.user.UserUploadAvatarReqDto;
import com.ntduong.next.util.Response;

public interface AuthController {
    Response register(UserRegisterDto userCreateDto);
    Response login(UserLoginDto userLoginDto);
    Response profile();
    Response addFavorite(UserFavoriteReq favoriteReq);
    Response getFavorites(UserFavoriteReq userFavoriteReq);
    Response getUserById(UserReqDto userReqDto);
    Response profileProps(UserSettingReqDto reqDto);
    Response sendOTP();

    Response verifyOTPEmail(OTPReqDto otpReqDto);

    Response uploadAvatar(UserUploadAvatarReqDto userUploadAvatarReqDto);

    Response saveProps(UserSettingReqDto reqDto);

}
