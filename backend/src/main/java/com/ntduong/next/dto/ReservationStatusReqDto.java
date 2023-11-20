package com.ntduong.next.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ReservationStatusReqDto {
    private Long reservationId;
    private Long status;
}
