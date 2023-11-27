package com.ntduong.next.repository;

import com.ntduong.next.dto.review.ReviewResDto;
import com.ntduong.next.entity.ReviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<ReviewEntity, Long> {
    @Query("SELECT NEW com.ntduong.next.dto.review.ReviewResDto(r.rating, r.content) FROM ReviewEntity r WHERE r.placeId = :placeId AND r.reservationId = :reservationId AND r.userId = :userId")
    ReviewResDto getReviewByUserCreate(@Param("placeId") Long placeId, @Param("reservationId") Long reservationId, @Param("userId") Long userId);

    @Query("SELECT NEW com.ntduong.next.dto.review.ReviewResDto(u.userId, u.username, u.avatar, r.createddate ,r.rating, r.content) FROM ReviewEntity r LEFT JOIN UserEntity u ON r.userId = u.userId WHERE r.placeId = :placeId ORDER BY r.rating DESC")
    List<ReviewResDto> getReviewsByPlace(@Param("placeId") Long placeId);

    @Query("SELECT COUNT(*) FROM ReviewEntity r WHERE r.placeId = :placeId")
    Long countReviewByPlace(@Param("placeId") Long placeId);
}
