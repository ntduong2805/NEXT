package com.ntduong.next.controller.impl;
import com.ntduong.next.constant.ApiConstant;
import com.ntduong.next.controller.AuthController;
import com.ntduong.next.dto.otp.OTPReqDto;
import com.ntduong.next.dto.user.UserFavoriteReq;
import com.ntduong.next.dto.user.UserSettingReqDto;
import com.ntduong.next.dto.user.UserRegisterDto;
import com.ntduong.next.dto.user.UserLoginDto;
import com.ntduong.next.dto.user.UserReqDto;
import com.ntduong.next.dto.user.UserResDto;
import com.ntduong.next.dto.user.UserUploadAvatarReqDto;
import com.ntduong.next.service.JwtService;
import com.ntduong.next.service.impl.UserServiceImpl;
import com.ntduong.next.util.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(ApiConstant.API_V2 + ApiConstant.AUTH)
public class AuthControllerImpl implements AuthController {

    @Autowired
    UserServiceImpl userService;

    @Autowired
    JwtService jwtService;

//    @PostMapping(value = ApiConstant.CLEAR_CACHE)
//    public void clearCache() {
//        redisConfig.clearCache("getListPlace");
//    }

    @PostMapping(ApiConstant.REGISTER)
    public Response register(@RequestBody UserRegisterDto userCreateDto) {
        long start = System.currentTimeMillis();
        try {
            userService.register(userCreateDto);
            return new Response(null, start);
        } catch (Exception e) {
            return new Response(ApiConstant.BAD_REQUEST, e.getMessage(), start);
        }

    }

    @PostMapping(ApiConstant.LOGIN)
    public Response login(@RequestBody UserLoginDto userLoginDto) {
        long start = System.currentTimeMillis();
        try {
            Map<String, Object> success = userService.login(userLoginDto);
            return new Response(success, start);
        } catch (Exception e){
            return new Response(ApiConstant.BAD_REQUEST, e.getMessage(), start);
        }
    }
    @PostMapping(value = ApiConstant.PROFILE)
    @Override
    public Response profile() {
        long start = System.currentTimeMillis();
        try {
            UserResDto user = userService.profile();
            return new Response(user, start);
        } catch (Exception e) {
            return new Response(ApiConstant.BAD_REQUEST, e.getMessage(), start);
        }
    }

    @PostMapping(value = ApiConstant.ACTION_FAVORITE)
    @Override
    public Response addFavorite(@RequestBody UserFavoriteReq favoriteReq) {
        long start = System.currentTimeMillis();
        try {
            String res = userService.actionFavorite(favoriteReq);
            return new Response(res, start);
        } catch (Exception e) {
            return new Response(ApiConstant.BAD_REQUEST, e.getMessage(), start);
        }
    }
    @PostMapping(value = ApiConstant.GET_FAVORITES)
    @Override
    public Response getFavorites(@RequestBody UserFavoriteReq userFavoriteReq) {
        long start = System.currentTimeMillis();
        try {
            List<Long> res = userService.getFavorites(userFavoriteReq);
            return new Response(res, start);
        } catch (Exception e) {
            return new Response(ApiConstant.BAD_REQUEST, e.getMessage(), start);
        }
    }

    @PostMapping(value = ApiConstant.GET_USER)
    @Override
    public Response getUserById(@RequestBody UserReqDto userReqDto) {
        long start = System.currentTimeMillis();
        try {
            UserResDto res = userService.getUserById(userReqDto);
            return new Response(res, start);
        } catch (Exception e) {
            return new Response(ApiConstant.BAD_REQUEST, e.getMessage(), start);
        }
    }

    @PostMapping(value = ApiConstant.PROFILE_PROPS)
    @Override
    public Response profileProps(UserSettingReqDto reqDto) {
        long start = System.currentTimeMillis();
        try {
            UserResDto res = userService.profileProps(reqDto);
            return new Response(res, start);
        } catch (Exception e) {
            return new Response(ApiConstant.BAD_REQUEST, e.getMessage(), start);
        }
    }

    @PostMapping(value = ApiConstant.SEND_OTP)
    @Override
    public Response sendOTP() {
        long start = System.currentTimeMillis();
        try {
            userService.sendOTPVerifyEmail();
            return new Response(null, start);
        } catch (Exception e) {
            return new Response(ApiConstant.BAD_REQUEST, e.getMessage(), start);
        }
    }

    @PostMapping(value = ApiConstant.VERIFY_OTP)
    @Override
    public Response verifyOTPEmail(@RequestBody OTPReqDto otpReqDto) {
        long start = System.currentTimeMillis();
        try {
            Boolean isVerify = userService.verifyEmail(otpReqDto);
            return new Response(isVerify, start);
        } catch (Exception e) {
            return new Response(ApiConstant.BAD_REQUEST, e.getMessage(), start);
        }
    }

    @PostMapping(value = ApiConstant.UPLOAD_AVATAR)
    @Override
    public Response uploadAvatar(@RequestBody UserUploadAvatarReqDto userUploadAvatarReqDto) {
        long start = System.currentTimeMillis();
        try {
            userService.uploadAvatar(userUploadAvatarReqDto);
            return new Response(null, start);
        } catch (Exception e) {
            return new Response(ApiConstant.BAD_REQUEST, e.getMessage(), start);
        }
    }

    @Override
    public Response saveProps(@RequestBody UserSettingReqDto reqDto) {
        long start = System.currentTimeMillis();
        try {
            userService.savePropsUser(reqDto);
            return new Response(null, start);
        } catch (Exception e) {
            return new Response(ApiConstant.BAD_REQUEST, e.getMessage(), start);
        }
    }
}