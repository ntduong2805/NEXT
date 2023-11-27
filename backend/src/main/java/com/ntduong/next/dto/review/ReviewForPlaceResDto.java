package com.ntduong.next.dto.review;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class ReviewForPlaceResDto {
    private Double avgRating;
    private Long totalData;

    private List<ReviewResDto> reviews;
}
