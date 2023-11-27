package com.ntduong.next.service.impl;

import com.ntduong.next.dto.review.ReviewForPlaceResDto;
import com.ntduong.next.dto.review.ReviewGetByUserCreateReqDto;
import com.ntduong.next.dto.review.ReviewReqDto;
import com.ntduong.next.dto.review.ReviewResDto;
import com.ntduong.next.entity.ReviewEntity;
import com.ntduong.next.exception.DetailException;
import com.ntduong.next.repository.ReviewRepository;
import com.ntduong.next.service.ReservationService;
import com.ntduong.next.service.ReviewService;
import com.ntduong.next.util.CommonDateUtil;
import com.ntduong.next.util.UserProfileUtils;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ReservationService reservationService;
    @Override
    public void create(ReviewReqDto reqDto) {
        checkValidateReq(reqDto);
        try {
            ReviewEntity entity = new ReviewEntity();
            entity.setUserId(UserProfileUtils.getUserId());
            entity.setPlaceId(reqDto.getPlaceId());
            entity.setReservationId(reqDto.getReservationId());
            entity.setRating(reqDto.getRating());
            entity.setContent(reqDto.getContent());
            entity.setCreateddate(CommonDateUtil.getSystemDateTime());
            reviewRepository.save(entity);
            reservationService.updateIsReview(reqDto.getReservationId());
        } catch (Exception e) {
            throw new DetailException(e.getMessage());
        }
    }

    @Override
    public ReviewResDto getReviewByUserCreate(ReviewGetByUserCreateReqDto reqDto) {
        return reviewRepository.getReviewByUserCreate(reqDto.getPlaceId(), reqDto.getReservationId(), UserProfileUtils.getUserId());
    }

    @Override
    public ReviewForPlaceResDto getReviewsByPlace(ReviewReqDto reqDto) {
        ReviewForPlaceResDto res = new ReviewForPlaceResDto();
        Long totalData = reviewRepository.countReviewByPlace(reqDto.getPlaceId());
        res.setTotalData(totalData);
        if (totalData > 0) {
            List<ReviewResDto> reviews = reviewRepository.getReviewsByPlace(reqDto.getPlaceId());
            res.setAvgRating(this.avgRating(reviews));
            res.setReviews(reviews);
        }
        return res;
    }

    private Double avgRating(List<ReviewResDto> resDtos) {
        if (ObjectUtils.isEmpty(resDtos)) {
            return 0.0;
        }
        double sum = 0.0;
        for (ReviewResDto review : resDtos) {
            sum += review.getRating();
        }

        return sum / resDtos.size();
    }

    private void checkValidateReq(ReviewReqDto reqDto) {
        if (ObjectUtils.isEmpty(reqDto.getPlaceId())) {
            throw new DetailException("Place ID is null");
        }
        if (ObjectUtils.isEmpty(reqDto.getReservationId())) {
            throw new DetailException("Reservation ID is null");
        }
        if (ObjectUtils.isEmpty(reqDto.getRating())) {
            throw new DetailException("Rating is null");
        }
        if (ObjectUtils.isEmpty(reqDto.getContent())) {
            throw new DetailException("Content is null");
        }
    }
}
