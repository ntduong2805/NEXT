package com.ntduong.next.controller.impl;

import com.ntduong.next.constant.ApiConstant;
import com.ntduong.next.controller.ReservationController;
import com.ntduong.next.dto.ReservationDateReqDto;
import com.ntduong.next.dto.ReservationDateResDto;
import com.ntduong.next.dto.ReservationOwnerResDto;
import com.ntduong.next.dto.ReservationReqDto;
import com.ntduong.next.dto.ReservationStatusReqDto;
import com.ntduong.next.dto.ReservationUserResDto;
import com.ntduong.next.entity.ReservationEntity;
import com.ntduong.next.service.ReservationService;
import com.ntduong.next.util.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = ApiConstant.API_V2 + ApiConstant.RESERVATION)
public class ReservationControllerImpl implements ReservationController {

    @Autowired
    ReservationService reservationService;

    @Override
    @PostMapping(value = ApiConstant.CREATE)
    public Response create(@RequestBody ReservationReqDto reservationDto) {
        long start = System.currentTimeMillis();
        try {
            ReservationEntity res = reservationService.create(reservationDto);
            return new Response(res, start);
        } catch (Exception e){
            return new Response(ApiConstant.BAD_REQUEST, e.getMessage(), start);
        }
    }

    @Override
    @PostMapping(value = ApiConstant.UPDATE)
    public Response update(@RequestBody ReservationReqDto reservationDto) {
        long start = System.currentTimeMillis();
        try {
            ReservationEntity res = reservationService.update(reservationDto);
            return new Response(res, start);
        } catch (Exception e){
            return new Response(ApiConstant.BAD_REQUEST, e.getMessage(), start);
        }
    }

    @Override
    @PostMapping(value = ApiConstant.USER)
    public Response getReservationByUser() {
        long start = System.currentTimeMillis();
        try {
            List<ReservationUserResDto> res =reservationService.getReservationByUser();
            return new Response(res, start);
        } catch (Exception e){
            return new Response(ApiConstant.BAD_REQUEST, e.getMessage(), start);
        }
    }

    @Override
    @PostMapping(value = ApiConstant.PLACE)
    public Response getReservationByPlaceId(@RequestBody ReservationDateReqDto reservationDto) {
        long start = System.currentTimeMillis();
        try {
            List<ReservationDateResDto> res = reservationService.getReservationByPlaceId(reservationDto);
            return new Response(res, start);
        } catch (Exception e){
            return new Response(ApiConstant.BAD_REQUEST, e.getMessage(), start);
        }
    }

    @Override
    @PostMapping(value = ApiConstant.OWNER)
    public Response getReservationByOwner(@RequestBody ReservationStatusReqDto reqDto) {
        long start = System.currentTimeMillis();
        try {
            List<ReservationOwnerResDto> res = reservationService.getReservationByOwner(reqDto);
            return new Response(res, start);
        } catch (Exception e){
            return new Response(ApiConstant.BAD_REQUEST, e.getMessage(), start);
        }
    }

    @Override
    @PostMapping(value = ApiConstant.CANCEL)
    public Response cancelReservation(@RequestBody ReservationReqDto reservationDto) {
        long start = System.currentTimeMillis();
        try {
            String res = reservationService.cancelReservation(reservationDto);
            return new Response(res, start);
        } catch (Exception e){
            return new Response(ApiConstant.BAD_REQUEST, e.getMessage(), start);
        }
    }

    @Override
    @PostMapping(value = ApiConstant.STATUS_CHANGE)
    public Response statusChange(@RequestBody ReservationStatusReqDto reqDto) {
        long start = System.currentTimeMillis();
        try {
            reservationService.statusChange(reqDto);
            return new Response("Change success", start);
        } catch (Exception e){
            return new Response(ApiConstant.BAD_REQUEST, e.getMessage(), start);
        }
    }
}
