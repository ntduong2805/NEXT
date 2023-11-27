package com.ntduong.next.dto.review;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ReviewReqDto {
    private Long placeId;
    private Long reservationId;
    private Double rating;
    private String content;
}
