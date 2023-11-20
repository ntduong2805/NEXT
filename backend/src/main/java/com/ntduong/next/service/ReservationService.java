package com.ntduong.next.service;

import com.ntduong.next.dto.ReservationDateReqDto;
import com.ntduong.next.dto.ReservationDateResDto;
import com.ntduong.next.dto.ReservationOwnerResDto;
import com.ntduong.next.dto.ReservationReqDto;
import com.ntduong.next.dto.ReservationStatusReqDto;
import com.ntduong.next.dto.ReservationUserResDto;
import com.ntduong.next.entity.ReservationEntity;

import java.util.List;

public interface ReservationService {
    public ReservationEntity create(ReservationReqDto reservationDto);
    public ReservationEntity update(ReservationReqDto reservationDto);
    public List<ReservationUserResDto> getReservationByUser();
    public List<ReservationDateResDto> getReservationByPlaceId(ReservationDateReqDto reservationDto);
    public List<ReservationOwnerResDto> getReservationByOwner(ReservationStatusReqDto reqDto);
    public String cancelReservation(ReservationReqDto reservationDto);

    public void statusChange(ReservationStatusReqDto reqDto);
}
