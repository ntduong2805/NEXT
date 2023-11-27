package com.ntduong.next.dto.review;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewGetByUserCreateReqDto {
    private Long placeId;
    private Long reservationId;
}
