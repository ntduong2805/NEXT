package com.ntduong.next.controller;

import com.ntduong.next.dto.OTPReqDto;
import com.ntduong.next.dto.user.UserFavoriteReq;
import com.ntduong.next.dto.user.UserRegisterDto;
import com.ntduong.next.dto.user.UserLoginDto;
import com.ntduong.next.dto.user.UserReqDto;
import com.ntduong.next.dto.user.UserResDto;
import com.ntduong.next.dto.user.UserUploadAvatarReqDto;
import com.ntduong.next.util.Response;
import org.springframework.web.multipart.MultipartFile;

public interface AuthController {
    Response register(UserRegisterDto userCreateDto);

    Response login(UserLoginDto userLoginDto);
    Response profile();

    Response addFavorite(UserFavoriteReq favoriteReq);
    Response getFavorites(UserFavoriteReq userFavoriteReq);
    Response getUserById(UserReqDto userReqDto);
    Response userSetting(UserResDto userResDto);

    Response sendOTP();

    Response verifyOTPEmail(OTPReqDto otpReqDto);

    Response uploadAvatar(UserUploadAvatarReqDto userUploadAvatarReqDto);

}
