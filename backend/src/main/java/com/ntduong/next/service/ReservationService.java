package com.ntduong.next.service;

import com.ntduong.next.dto.reservation.ReservationDateReqDto;
import com.ntduong.next.dto.reservation.ReservationDateResDto;
import com.ntduong.next.dto.reservation.ReservationOwnerResDto;
import com.ntduong.next.dto.reservation.ReservationReqDto;
import com.ntduong.next.dto.reservation.ReservationStatusReqDto;
import com.ntduong.next.dto.reservation.ReservationUserResDto;
import com.ntduong.next.entity.ReservationEntity;

import java.util.List;

public interface ReservationService {
    public ReservationEntity create(ReservationReqDto reservationDto);
    public ReservationEntity update(ReservationReqDto reservationDto);
    public List<ReservationUserResDto> getReservationByUser(ReservationStatusReqDto reqDto);
    public List<ReservationDateResDto> getReservationByPlaceId(ReservationDateReqDto reservationDto);
    public List<ReservationOwnerResDto> getReservationByOwner(ReservationStatusReqDto reqDto);
    public String cancelReservation(ReservationReqDto reservationDto);

    public void statusChange(ReservationStatusReqDto reqDto);

    public void updateIsReview(Long reservationId);
}
