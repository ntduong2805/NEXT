package com.ntduong.next.controller;

import com.ntduong.next.dto.ReservationDto;
import com.ntduong.next.util.Response;

public interface ReservationController {
    public Response create(ReservationDto reservationDto);
    public Response update(ReservationDto reservationDto);
    public Response getReservationByUserId(ReservationDto reservationDto);
    public Response getReservationByListingId(ReservationDto reservationDto);
}
