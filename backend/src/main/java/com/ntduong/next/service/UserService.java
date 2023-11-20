package com.ntduong.next.service;

import com.ntduong.next.dto.OTPReqDto;
import com.ntduong.next.dto.user.UserFavoriteReq;
import com.ntduong.next.dto.user.UserRegisterDto;
import com.ntduong.next.dto.user.UserLoginDto;
import com.ntduong.next.dto.user.UserReqDto;
import com.ntduong.next.dto.user.UserResDto;
import com.ntduong.next.dto.user.UserUploadAvatarReqDto;
import com.ntduong.next.entity.UserEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface UserService {

    UserResDto userMapper(UserEntity user);
    UserResDto register(UserRegisterDto userCreateDto);
    Map<String, Object> login(UserLoginDto userLoginDto);
    UserResDto profile();
    String actionFavorite(UserFavoriteReq favoriteReq);
    List<Long> getFavorites(UserFavoriteReq userFavoriteReq);
    UserResDto getUserById(UserReqDto userReqDto);
    UserResDto settingProfile(UserResDto userResDto);

    void sendOTPVerifyEmail();
    Boolean verifyEmail(OTPReqDto otpReqDto);

    void uploadAvatar(UserUploadAvatarReqDto userUploadAvatarReqDto);
}
