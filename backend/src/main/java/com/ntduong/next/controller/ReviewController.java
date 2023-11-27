package com.ntduong.next.controller;

import com.ntduong.next.dto.review.ReviewGetByUserCreateReqDto;
import com.ntduong.next.dto.review.ReviewReqDto;
import com.ntduong.next.util.Response;

public interface ReviewController {
    Response create(ReviewReqDto reqDto);
    Response getReviewByUserCreate(ReviewGetByUserCreateReqDto reqDto);

    Response getReviewByPlace(ReviewReqDto reqDto);
}
