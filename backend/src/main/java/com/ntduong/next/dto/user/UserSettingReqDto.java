package com.ntduong.next.dto.user;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserSettingReqDto {
    private String username;
    private String email;
    private String phoneNumber;
    private String address;


}
