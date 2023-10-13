package com.ntduong.next.service;

import com.ntduong.next.dto.ReservationDto;
import com.ntduong.next.entity.ReservationEntity;

import java.util.List;

public interface ReservationService {
    public ReservationEntity create(ReservationDto reservationDto);
    public ReservationEntity update(ReservationDto reservationDto);
    public List<ReservationDto> getReservationByUserId(ReservationDto reservationDto);
    public List<ReservationEntity> getReservationByListingId(ReservationDto reservationDto);
}
