package com.ntduong.next.repository;

import com.ntduong.next.dto.reservation.ReservationDateResDto;
import com.ntduong.next.dto.reservation.ReservationOwnerResDto;
import com.ntduong.next.dto.reservation.ReservationUserResDto;
import com.ntduong.next.entity.ReservationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
public interface ReservationRepository extends JpaRepository<ReservationEntity, Long> {
    @Query("SELECT NEW com.ntduong.next.dto.reservation.ReservationUserResDto(r.reservationId, p.userId, r.placeId, r.startDate, r.endDate, r.nightCount, r.guestCount, r.totalPrice, r.status, p.title, p.price, i.url, u.username, u.avatar, u.phoneNumber, u.email, r.isReview) " +
            "FROM ReservationEntity r " +
            "LEFT JOIN PlaceEntity p " +
            "ON r.placeId = p.placeId " +
            "LEFT JOIN ImageEntity i " +
            "ON i.placeId = r.placeId " +
            "LEFT JOIN UserEntity u " +
            "ON p.userId = u.userId " +
            "WHERE r.userId = :userId " +
            "AND i.isPrimary = :isPrimary " +
            "AND r.startDate >= CURRENT_DATE " +
            "AND r.status IN :status " +
            "ORDER BY r.reservationId DESC")
    List<ReservationUserResDto> getReservationByUserId(Long userId, List<Long> status,  Long isPrimary);

    @Query("SELECT NEW com.ntduong.next.dto.reservation.ReservationDateResDto(r.startDate , r.endDate) FROM ReservationEntity r  WHERE r.placeId = :placeId AND r.startDate > CURRENT_DATE ORDER BY r.createddate DESC")
    List<ReservationDateResDto> getReservationByPlaceId(Long placeId);

    @Query("SELECT NEW com.ntduong.next.dto.reservation.ReservationOwnerResDto(r.reservationId, r.userId, r.placeId, r.startDate, r.endDate, r.nightCount, r.guestCount, r.totalPrice, r.status, p.title, p.price, i.url, u.username, u.avatar, u.phoneNumber, u.email) " +
            "FROM ReservationEntity r " +
            "LEFT JOIN PlaceEntity p " +
            "ON r.placeId = p.placeId " +
            "LEFT JOIN ImageEntity i " +
            "ON i.placeId = r.placeId " +
            "LEFT JOIN UserEntity u " +
            "ON r.userId = u.userId " +
            "WHERE p.userId = :ownerId " +
            "AND (:status IS NULL OR r.status = :status) " +
            "AND i.isPrimary = :isPrimary " +
            "AND r.startDate >= CURRENT_DATE " +
            "ORDER BY r.reservationId DESC")
    List<ReservationOwnerResDto> getReservationByOwner(Long ownerId, Long status, Long isPrimary);

    @Modifying
    @Transactional
    @Query("UPDATE ReservationEntity r SET r.isReview = 1L WHERE r.reservationId = :reservationId")
    void updateIsReview(@Param("reservationId") Long reservationId);
}
