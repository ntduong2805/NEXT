package com.ntduong.next.service;

import com.ntduong.next.dto.review.ReviewForPlaceResDto;
import com.ntduong.next.dto.review.ReviewGetByUserCreateReqDto;
import com.ntduong.next.dto.review.ReviewReqDto;
import com.ntduong.next.dto.review.ReviewResDto;

public interface ReviewService {
    public void create(ReviewReqDto reqDto);

    public ReviewResDto getReviewByUserCreate(ReviewGetByUserCreateReqDto reqDto);

    public ReviewForPlaceResDto getReviewsByPlace(ReviewReqDto reqDto);
}
