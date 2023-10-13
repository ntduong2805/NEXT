package com.ntduong.next.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ntduong.next.dto.listing.ListingDto;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
@Setter
@Getter
public class ReservationDto {
    private Long reservationId;
    private Long userId;
    private Long listingId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss.SSS")
    private Date startDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss.SSS")
    private Date endDate;
    private Long totalPrice;
    private ListingDto listing;
}
