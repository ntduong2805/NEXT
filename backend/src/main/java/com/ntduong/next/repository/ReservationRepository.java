package com.ntduong.next.repository;

import com.ntduong.next.entity.ReservationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ReservationRepository extends JpaRepository<ReservationEntity, Long> {

    List<ReservationEntity> findAllByUserId(Long userId);

    List<ReservationEntity> findAllByListingId(Long listingId);
}
