package com.ntduong.next.service.impl;

import com.ntduong.next.dto.ReservationDto;
import com.ntduong.next.dto.listing.ListingDto;
import com.ntduong.next.entity.ListingEntity;
import com.ntduong.next.entity.ReservationEntity;
import com.ntduong.next.exception.DetailException;
import com.ntduong.next.repository.ImageRepository;
import com.ntduong.next.repository.ListingRepository;
import com.ntduong.next.repository.ReservationRepository;
import com.ntduong.next.service.ListingService;
import com.ntduong.next.service.ReservationService;
import com.ntduong.next.util.CommonDateUtil;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class ReservationServiceImpl implements ReservationService {

    @Autowired
    private ListingService listingService;
    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private ReservationRepository reservationRepository;

    @Override
    public ReservationEntity create(ReservationDto reservationDto) {
        checkValidate(reservationDto);
        ReservationEntity reservation = new ReservationEntity();
        BeanUtils.copyProperties(reservationDto, reservation);
        reservation.setCreateddate(CommonDateUtil.getSystemDateTime());
        ReservationEntity res = reservationRepository.save(reservation);
        return res;
    }

    @Override
    public ReservationEntity update(ReservationDto reservationDto) {
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
        ReservationEntity res = reservationRepository.save(updateEntity);
        return res;
    }

    @Override
    public List<ReservationDto> getReservationByUserId(ReservationDto reservationDto) {
        if (ObjectUtils.isEmpty(reservationDto.getUserId())) {
            throw new DetailException("User Id is not null");
        }
        List<ReservationEntity> lstReservation = reservationRepository.findAllByUserId(reservationDto.getUserId());
        return lstReservation.stream().map(reservation -> {
            ReservationDto reservationRes = new ReservationDto();
            BeanUtils.copyProperties(reservation, reservationRes);
            ListingDto listingDto = new ListingDto();
            listingDto.setListingId(reservation.getListingId());
            ListingDto listing = listingService.getListing(listingDto);
            reservationRes.setListing(listing);
            return reservationRes;
        }).collect(Collectors.toList());
    }

    @Override
    public List<ReservationEntity> getReservationByListingId(ReservationDto reservationDto) {

        if (ObjectUtils.isEmpty(reservationDto.getListingId())) {
            throw new DetailException("Listing Id is not null");
        }
        List<ReservationEntity> lstReservation = reservationRepository.findAllByListingId(reservationDto.getListingId());

        return lstReservation;
    }

    public void checkValidate(ReservationDto reservationDto) {
        if (ObjectUtils.isEmpty(reservationDto.getUserId())) {
            throw new DetailException("User Id is not null");
        }
        if (ObjectUtils.isEmpty(reservationDto.getListingId())) {
            throw new DetailException("Listing Id is not null");
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
