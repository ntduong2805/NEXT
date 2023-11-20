package com.ntduong.next.repository;

import com.ntduong.next.entity.UserFavoriteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserFavoriteRepository extends JpaRepository<UserFavoriteEntity, Long> {
    @Query("SELECT u.placeId FROM UserFavoriteEntity u WHERE u.userId = :userId")
    List<Long> getPlaceIdByUserId(Long userId);

    void deleteUserFavoriteEntityByPlaceIdAndUserId(Long placeId, Long userId);
}
