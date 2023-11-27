package com.ntduong.next.dto.reservation;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
public class ReservationDateResDto {
    private Date startDate;
    private Date endDate;

}
