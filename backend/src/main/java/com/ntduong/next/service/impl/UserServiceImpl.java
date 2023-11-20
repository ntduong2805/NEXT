package com.ntduong.next.service.impl;

import com.ntduong.next.dto.OTPReqDto;
import com.ntduong.next.dto.user.UserFavoriteReq;
import com.ntduong.next.dto.user.UserRegisterDto;
import com.ntduong.next.dto.user.UserLoginDto;
import com.ntduong.next.dto.user.UserReqDto;
import com.ntduong.next.dto.user.UserResDto;
import com.ntduong.next.dto.user.UserUploadAvatarReqDto;
import com.ntduong.next.entity.Role;
import com.ntduong.next.entity.UserEntity;
import com.ntduong.next.entity.UserFavoriteEntity;
import com.ntduong.next.exception.DetailException;
import com.ntduong.next.repository.UserFavoriteRepository;
import com.ntduong.next.repository.UserRepository;
import com.ntduong.next.service.CloudinaryService;
import com.ntduong.next.service.OTPService;
import com.ntduong.next.service.UserService;
import com.ntduong.next.util.UserProfileUtils;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {

    public static final Long NOT_VERIFIED = 0L;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserFavoriteRepository userFavoriteRepository;

    @Autowired
    JwtServiceImpl jwtService;

    @Autowired
    OTPService otpService;

    @Autowired
    CloudinaryService cloudinaryService;
    private final PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();

    @Override
    public UserResDto userMapper(UserEntity user) {
        return UserResDto.builder()
                .userId(user.getUserId())
                .username(user.getUsername())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .build();
    }

    @Override
    public UserResDto register(UserRegisterDto userCreateDto) {
        UserEntity newUser = userRepository.save(
                UserEntity.builder()
                        .username(userCreateDto.getUsername())
                        .email(userCreateDto.getEmail())
                        .password(passwordEncoder.encode(userCreateDto.getPassword()))
                        .phoneNumber(userCreateDto.getPhoneNumber())
                        .isVerifyEmail(NOT_VERIFIED)
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
        UserResDto userRes = new UserResDto();
        BeanUtils.copyProperties(user, userRes);
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
        UserResDto userResponseDto = new UserResDto();
        UserEntity user = userRepository.getById(Objects.requireNonNull(UserProfileUtils.getUserId()));

        userResponseDto.setUserId(user.getUserId());
        userResponseDto.setEmail(user.getEmail());
        userResponseDto.setUsername(user.getUsername());
        userResponseDto.setPhoneNumber(user.getPhoneNumber());
        userResponseDto.setAvatar(user.getAvatar());
        userResponseDto.setIsVerified(user.getIsVerifyEmail());
        return userResponseDto;
    }

    @Override
    @Transactional(readOnly = false, rollbackFor = Exception.class)
    public String actionFavorite(UserFavoriteReq favoriteReq) {
        String res = "Success";
        if (ObjectUtils.isEmpty(favoriteReq.getUserId())) {
            throw new DetailException("User id is not null");
        }
        if (ObjectUtils.isEmpty(favoriteReq.getPlaceId())) {
            throw new DetailException("Place id is not null");
        }
        try {
            List<Long> userFavorites = userFavoriteRepository.getPlaceIdByUserId(favoriteReq.getUserId());
            if (userFavorites.contains(favoriteReq.getPlaceId())) {
                userFavoriteRepository.deleteUserFavoriteEntityByPlaceIdAndUserId(favoriteReq.getPlaceId(), favoriteReq.getUserId());
            } else {
                UserFavoriteEntity userFavorite = new UserFavoriteEntity();
                userFavorite.setUserId(favoriteReq.getUserId());
                userFavorite.setPlaceId(favoriteReq.getPlaceId());
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
        List<Long> favorites = userFavoriteRepository.getPlaceIdByUserId(userFavoriteReq.getUserId());
        return favorites;
    }

    @Override
    public UserResDto getUserById(UserReqDto userReqDto) {
        if (ObjectUtils.isEmpty(userReqDto.getUserId())) {
            throw new DetailException("User Id is not null");
        }
        UserEntity userEntity = userRepository.getById(userReqDto.getUserId());
        UserResDto userResDto = new UserResDto();
        BeanUtils.copyProperties(userEntity, userResDto);
        return userResDto;
    }

    @Override
    public UserResDto settingProfile(UserResDto userResDto) {
        UserEntity userEntity = UserProfileUtils.getUserPrincipal();
        if (ObjectUtils.isNotEmpty(userResDto.getUsername())) {
            userEntity.setUsername(userResDto.getUsername());
        }
        if (ObjectUtils.isNotEmpty(userResDto.getEmail())) {
            userEntity.setEmail(userResDto.getEmail());
        }
        if (ObjectUtils.isNotEmpty(userResDto.getPhoneNumber())) {
            userEntity.setPhoneNumber(userResDto.getPhoneNumber());
        }
        if (ObjectUtils.isNotEmpty(userResDto.getAvatar())) {
            userEntity.setAvatar(userEntity.getAvatar());
        }
        UserResDto res = new UserResDto();
        BeanUtils.copyProperties(userEntity, res);
        return res;
    }

    @Override
    public void sendOTPVerifyEmail() {
        otpService.sendOTPMail();
    }

    @Override
    public Boolean verifyEmail(OTPReqDto otpReqDto) {
        try {
            Boolean isVerify = otpService.verifyOTP(otpReqDto.getOtpCode(), UserProfileUtils.getUserId());
            if (Boolean.TRUE.equals(isVerify)) {
                userRepository.verifyEmail(UserProfileUtils.getUserId());
            }
            return isVerify;
        } catch (Exception e) {
            throw new DetailException(e.getMessage());
        }
    }

    @Override
    public void uploadAvatar(UserUploadAvatarReqDto userUploadAvatarReqDto) {
        try {
            if (ObjectUtils.isNotEmpty(userUploadAvatarReqDto.getAvatar())) {
                userRepository.uploadAvatar(userUploadAvatarReqDto.getAvatar(), UserProfileUtils.getUserId());
            }
        } catch (Exception e) {
            throw new DetailException(e.getMessage());
        }
    }

}
