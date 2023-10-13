package com.ntduong.next.repository;

import com.ntduong.next.entity.UserFavoriteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserFavoriteRepository extends JpaRepository<UserFavoriteEntity, Long> {
    @Query("SELECT u.listingId FROM UserFavoriteEntity u WHERE u.userId = :userId")
    List<Long> getListingIdByUserId(Long userId);

    void deleteUserFavoriteEntityByListingIdAndAndUserId(Long listingId, Long userId);
}
