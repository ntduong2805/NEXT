package com.ntduong.next.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResDto {
    private Long userId;
    private String username;
    private String email;
    private String avatar;
    private String phoneNumber;
    private String address;
    private Long isVerifyEmail;
}
