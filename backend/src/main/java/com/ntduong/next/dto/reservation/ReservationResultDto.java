package com.ntduong.next.dto.reservation;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ntduong.next.dto.place.PlaceResDto;

import java.util.Date;

public class ReservationResultDto {
    private Long reservationId;
    private Long userId;
    private Long placeId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss.SSS")
    private Date startDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss.SSS")
    private Date endDate;
    private Long totalPrice;
    private PlaceResDto place;
}
