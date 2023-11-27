package com.ntduong.next.dto.reservation;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
public class ReservationOwnerResDto {
    private Long reservationId;
    private Long userId;
    private Long placeId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date startDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date endDate;
    private Long nightCount;
    private Long guestCount;
    private Double totalPrice;
    private Long status;
    private String title;
    private Long price;
    private String url;
    private String customer;
    private String avatar;
    private String phoneNumber;
    private String email;

    public ReservationOwnerResDto(Long reservationId, Long userId, Long placeId, Date startDate, Date endDate, Long nightCount, Long guestCount, Double totalPrice, Long status, String title, Long price, String url, String customer, String avatar, String phoneNumber, String email) {
        this.reservationId = reservationId;
        this.userId = userId;
        this.placeId = placeId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.nightCount = nightCount;
        this.guestCount = guestCount;
        this.totalPrice = totalPrice;
        this.status = status;
        this.title = title;
        this.price = price;
        this.url = url;
        this.customer = customer;
        this.avatar = avatar;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
}
