package com.ntduong.next.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OTPResDto {
    private Long otpId;
    private Long userId;
    private String otpCode;
    private Long otpExpiredAt;
    /**
     * Status value
     * @Value = 0
     * @Value = 1
     * @Value = 2
     *
     */
    private Long status;
}
