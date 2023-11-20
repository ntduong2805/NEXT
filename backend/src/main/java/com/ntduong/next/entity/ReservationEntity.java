package com.ntduong.next.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "reservations")
public class ReservationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reservationId;
    private Long userId;
    private Long placeId;
    private Date startDate;
    private Date endDate;
    private Long nightCount;
    private Long guestCount;
    private Double totalPrice;
    /*
    * Status Reservation
    * 0: pending chờ xác nhận
    * 1: confirmed đã xác nhận
    * 2: cancelled bị hủy
    * 3: completed hoàn thành
    * */
    private Long status;
    private Date createddate;
    private String createdby;
    private Date updateddate;
    private String updatedby;
}
