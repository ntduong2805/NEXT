package com.ntduong.next.repository;

import com.ntduong.next.dto.place.PlaceDto;
import com.ntduong.next.dto.place.PlaceResDto;
import com.ntduong.next.entity.PlaceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface PlaceRepository extends JpaRepository<PlaceEntity, Long> {
    @Query("SELECT p FROM PlaceEntity p ORDER BY p.createddate DESC")
    List<PlaceEntity> getListPlace();

    @Query("SELECT NEW com.ntduong.next.dto.place.PlaceResDto(" +
            "p.placeId, " +
            "p.title, " +
            "p.category, " +
            "p.description, " +
            "p.address, " +
            "p.bathroomCount, " +
            "p.guestCount, " +
            "p.roomCount, " +
            "p.price, " +
            "p.location, " +
            "p.userId, " +
            "u.username, " +
            "u.avatar) " +
            "FROM PlaceEntity p " +
            "LEFT JOIN UserEntity u ON p.userId = u.userId " +
            "WHERE p.placeId = :placeId")
    PlaceResDto getPlace(@Param("placeId") Long placeId);


    @Query("SELECT p FROM PlaceEntity p WHERE p.userId = :userId")
    List<PlaceEntity> getListPlaceByOwner(@Param("userId") Long userId);

    @Query("SELECT p FROM PlaceEntity p WHERE p.placeId IN :favorites")
    List<PlaceEntity> getListPlaceFavorites(List<Long> favorites);

}
