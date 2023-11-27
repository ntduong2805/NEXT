package com.ntduong.next.controller.impl;

import com.ntduong.next.constant.ApiConstant;
import com.ntduong.next.controller.ReviewController;
import com.ntduong.next.dto.review.ReviewForPlaceResDto;
import com.ntduong.next.dto.review.ReviewGetByUserCreateReqDto;
import com.ntduong.next.dto.review.ReviewReqDto;
import com.ntduong.next.dto.review.ReviewResDto;
import com.ntduong.next.service.ReviewService;
import com.ntduong.next.util.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(ApiConstant.API_V2 + ApiConstant.REVIEW)
public class ReviewControllerImpl implements ReviewController {

    @Autowired
    private ReviewService reviewService;
    @Override
    @PostMapping(value = ApiConstant.CREATE)
    public Response create(@RequestBody ReviewReqDto reqDto) {
        long start = System.currentTimeMillis();
        try {
            reviewService.create(reqDto);
            return new Response(null, start);
        } catch (Exception e) {
            return new Response(ApiConstant.BAD_REQUEST, e.getMessage(), start);
        }
    }

    @Override
    @PostMapping(value = ApiConstant.GET_REVIEW_BY_USER_CREATE)
    public Response getReviewByUserCreate(@RequestBody ReviewGetByUserCreateReqDto reqDto) {
        long start = System.currentTimeMillis();
        try {
            ReviewResDto res = reviewService.getReviewByUserCreate(reqDto);
            return new Response(res, start);
        } catch (Exception e) {
            return new Response(ApiConstant.BAD_REQUEST, e.getMessage(), start);
        }
    }

    @Override
    @PostMapping(value = ApiConstant.GET_REVIEW_BY_PLACE)
    public Response getReviewByPlace(@RequestBody ReviewReqDto reqDto) {
        long start = System.currentTimeMillis();
        try {
            ReviewForPlaceResDto res = reviewService.getReviewsByPlace(reqDto);
            return new Response(res, start);
        } catch (Exception e) {
            return new Response(ApiConstant.BAD_REQUEST, e.getMessage(), start);
        }
    }
}
