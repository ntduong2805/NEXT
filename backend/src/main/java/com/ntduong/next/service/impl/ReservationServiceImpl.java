package com.ntduong.next.service.impl;


import com.ntduong.next.dto.ReservationDateReqDto;
import com.ntduong.next.dto.ReservationDateResDto;
import com.ntduong.next.dto.ReservationOwnerResDto;
import com.ntduong.next.dto.ReservationReqDto;
import com.ntduong.next.dto.ReservationStatusReqDto;
import com.ntduong.next.dto.ReservationUserResDto;
import com.ntduong.next.entity.ReservationEntity;
import com.ntduong.next.exception.DetailException;
import com.ntduong.next.repository.ReservationRepository;
import com.ntduong.next.service.ReservationService;
import com.ntduong.next.util.CommonDateUtil;
import com.ntduong.next.util.UserProfileUtils;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class ReservationServiceImpl implements ReservationService {

    public static final Long PENDING_STATUS = 0L;
    public static final Long CONFIRM_STATUS = 1L;
    public static final Long CHECKIN_STATUS = 2L;
    public static final Long CHECKOUT_STATUS = 3L;
    public static final Long CANCEL_STATUS = 4L;

    @Autowired
    private ReservationRepository reservationRepository;

    public static final String SUCCESS = "Canceled successfully";
    public static final String FAIL = "Cancel failure";


    @Override
    public ReservationEntity create(ReservationReqDto reservationDto) {
        checkValidate(reservationDto);
        ReservationEntity reservation = new ReservationEntity();
        BeanUtils.copyProperties(reservationDto, reservation);
        reservation.setStatus(PENDING_STATUS);
        reservation.setCreateddate(CommonDateUtil.getSystemDateTime());
        reservation.setCreatedby(UserProfileUtils.getUserLogin());
        return reservationRepository.save(reservation);
    }

    @Override
    public ReservationEntity update(ReservationReqDto reservationDto) {
        if (ObjectUtils.isEmpty(reservationDto.getReservationId())) {
            throw new DetailException("Reservation Id is not null");
        }
        ReservationEntity updateEntity = reservationRepository.getById(reservationDto.getReservationId());
        if (Objects.isNull(updateEntity)) {
            throw new DetailException("Reservation is not exist");
        }
        checkValidate(reservationDto);
        if (!reservationDto.getStartDate().equals(updateEntity.getStartDate())) {
            updateEntity.setStartDate(reservationDto.getStartDate());
        }
        if (!reservationDto.getEndDate().equals(updateEntity.getEndDate())) {
            updateEntity.setEndDate(reservationDto.getEndDate());
        }
        if (!reservationDto.getTotalPrice().equals(updateEntity.getTotalPrice())) {
            updateEntity.setTotalPrice(reservationDto.getTotalPrice());
        }
        return reservationRepository.save(updateEntity);
    }

    @Override
    public List<ReservationUserResDto> getReservationByUser() {
        Long userId = UserProfileUtils.getUserId();
        return reservationRepository.getReservationByUserId(userId, 1L);

    }
    public void setStatusReservation(ReservationReqDto reservationDto, Long status) {
        if (status.equals(PENDING_STATUS)) {
            reservationDto.setStatus("Pending");
        } else if (status.equals(CONFIRM_STATUS)) {
            reservationDto.setStatus("Confirm");
        } else if (status.equals(CHECKIN_STATUS)) {
            reservationDto.setStatus("CheckIn");
        } else if (status.equals(CHECKOUT_STATUS)) {
            reservationDto.setStatus("CheckOut");
        }
    }
    @Override
    public List<ReservationDateResDto> getReservationByPlaceId(ReservationDateReqDto reservationDto) {
        if (ObjectUtils.isEmpty(reservationDto.getPlaceId())) {
            throw new DetailException("Place Id is not null");
        }
        return reservationRepository.getReservationByPlaceId(reservationDto.getPlaceId());
    }

    @Override
    public List<ReservationOwnerResDto> getReservationByOwner(ReservationStatusReqDto reqDto) {
        Long ownerId = UserProfileUtils.getUserId();
        return reservationRepository.getReservationByOwner(ownerId, reqDto.getStatus(), 1L);

    }

    @Override
    public String cancelReservation(ReservationReqDto reservationDto) {
        if (ObjectUtils.isEmpty(reservationDto.getReservationId())) {
            throw new DetailException("Reservation Id is null");
        }
        ReservationEntity reservation = reservationRepository.getById(reservationDto.getReservationId());
        if (Objects.isNull(reservation)) {
            throw new DetailException("Reservation is not exist");
        }
        try {
            reservation.setStatus(CANCEL_STATUS);
            reservationRepository.save(reservation);
            return SUCCESS;
        } catch (Exception e) {
            throw new DetailException(e.getMessage());
        }

    }

    @Override
    public void statusChange(ReservationStatusReqDto reqDto) {
        if (ObjectUtils.isEmpty(reqDto.getReservationId())) {
            throw new DetailException("Reservation Id is not null");
        }
        if (ObjectUtils.isEmpty(reqDto.getStatus())) {
            throw new DetailException("Reservation status is null");
        }
        try {
            ReservationEntity reservation = reservationRepository.getById(reqDto.getReservationId());
            reservation.setStatus(reqDto.getStatus());
            reservationRepository.save(reservation);
        } catch (Exception e) {
            throw new DetailException(e.getMessage());
        }
    }


    public void checkValidate(ReservationReqDto reservationDto) {
        if (ObjectUtils.isEmpty(reservationDto.getUserId())) {
            throw new DetailException("User Id is not null");
        }
        if (ObjectUtils.isEmpty(reservationDto.getPlaceId())) {
            throw new DetailException("Place Id is not null");
        }
        if (ObjectUtils.isEmpty(reservationDto.getStartDate())) {
            throw new DetailException("Start date is not null");
        }
        if (ObjectUtils.isEmpty(reservationDto.getEndDate())) {
            throw new DetailException("End date is not null");
        }
        if (ObjectUtils.isEmpty(reservationDto.getTotalPrice())) {
            throw new DetailException("Total price is not null");
        }
    }
}
