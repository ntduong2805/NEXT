package com.ntduong.next.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserLoginResDto {
    @JsonProperty("id_refresh_token")
    private String idRefreshToken;
    private UserResponseDto user;
}
