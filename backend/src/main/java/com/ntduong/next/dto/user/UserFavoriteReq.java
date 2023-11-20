package com.ntduong.next.dto.user;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserFavoriteReq {
    private Long userId;
    private Long placeId;
}
