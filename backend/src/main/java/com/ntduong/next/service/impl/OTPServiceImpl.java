package com.ntduong.next.service.impl;

import com.ntduong.next.entity.OTPEntity;
import com.ntduong.next.exception.DetailException;
import com.ntduong.next.repository.OTPRepository;
import com.ntduong.next.service.OTPService;
import com.ntduong.next.util.UserProfileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Date;
import java.util.Objects;
import java.util.concurrent.TimeUnit;

@Service
public class OTPServiceImpl implements OTPService {

    @Value("${otp.expired.in}")
    private Long otpExpiredIn;

    @Value("${otp.max.length}")
    private Long otpLength;

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private OTPRepository otpRepository;

    public static final Long NEW_STATUS = 0L;

    public static final Long VERIFY_STATUS = 1L;

    @Override
    public String generateOTP() {
        StringBuilder generateOTP = new StringBuilder();
        SecureRandom secureRandom;
        try {
            secureRandom = SecureRandom.getInstanceStrong();
            for (int i = 0; i < otpLength; i++) {
                generateOTP.append(secureRandom.nextInt(9));
            }
        } catch (NoSuchAlgorithmException e) {
            throw new DetailException("Generate OTP Error");
        }
        return generateOTP.toString();
    }

    @Override
    public Long getOTPExpiredAt() {
        return new Date().getTime() + TimeUnit.SECONDS.toMillis(otpExpiredIn);
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public void sendOTPMail() {
        otpRepository.deleteOTPByUserId(UserProfileUtils.getUserId());
        String otpCode = generateOTP();
        // Lưu thông tin OTP vào cơ sở dữ liệu
        OTPEntity otpEntity = new OTPEntity();
        otpEntity.setUserId(UserProfileUtils.getUserId());
        otpEntity.setOtpCode(otpCode);
        otpEntity.setStatus(NEW_STATUS);
        otpEntity.setOtpExpiredAt(getOTPExpiredAt());
        otpRepository.save(otpEntity);

        // Gửi email chứa mã OTP
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(Objects.requireNonNull(UserProfileUtils.getEmailLogin()));
        message.setFrom("Next <no-reply@accounts.next.com>");
        message.setSubject("Xác thực OTP");
        message.setText("Mã OTP của bạn là: " + otpCode);

        emailSender.send(message);

    }

    @Override
    public Boolean verifyOTP(String otpCode, Long userId) {
        OTPEntity otpEntity = otpRepository.getOTPEntityByUserId(userId);
        if (otpEntity != null) {
            Long currentTime = new Date().getTime();
            if (otpEntity.getOtpExpiredAt() > currentTime && otpEntity.getOtpCode().equals(otpCode)) {
                otpRepository.deleteOTPByUserId(UserProfileUtils.getUserId());
                return true;
            }
        }
        return false;
    }
}
