package com.ntduong.next.service;

public interface OTPService {
    String generateOTP();

    Long getOTPExpiredAt();

    void sendOTPMail();

    Boolean verifyOTP(String otpCode, Long userId);
}
