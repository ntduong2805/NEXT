package com.ntduong.next.controller;


import com.ntduong.next.dto.ReservationDateReqDto;
import com.ntduong.next.dto.ReservationReqDto;
import com.ntduong.next.dto.ReservationStatusReqDto;
import com.ntduong.next.util.Response;

public interface ReservationController {
    public Response create(ReservationReqDto reservationDto);
    public Response update(ReservationReqDto reservationDto);
    public Response getReservationByUser();
    public Response getReservationByPlaceId(ReservationDateReqDto reservationDto);
    public Response getReservationByOwner(ReservationStatusReqDto reqDto);
    public Response cancelReservation(ReservationReqDto reservationDto);

    public Response statusChange(ReservationStatusReqDto reqDto);
}
