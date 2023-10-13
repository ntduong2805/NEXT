package com.ntduong.next.controller.impl;

import com.ntduong.next.controller.ReservationController;
import com.ntduong.next.dto.ReservationDto;
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
@RequestMapping("/api/v2/reservation")
public class ReservationControllerImpl implements ReservationController {

    @Autowired
    ReservationService reservationService;

    @Override
    @PostMapping(value = "/create")
    public Response create(@RequestBody ReservationDto reservationDto) {
        long start = System.currentTimeMillis();
        try {
            ReservationEntity res = reservationService.create(reservationDto);
            return new Response(res, start);
        } catch (Exception e){
            return new Response(400, e.getMessage(), start);
        }
    }

    @Override
    @PostMapping(value = "/update")
    public Response update(@RequestBody ReservationDto reservationDto) {
        long start = System.currentTimeMillis();
        try {
            ReservationEntity res = reservationService.update(reservationDto);
            return new Response(res, start);
        } catch (Exception e){
            return new Response(400, e.getMessage(), start);
        }
    }

    @Override
    @PostMapping(value = "/user")
    public Response getReservationByUserId(@RequestBody ReservationDto reservationDto) {
        long start = System.currentTimeMillis();
        try {
            List<ReservationDto> res =reservationService.getReservationByUserId(reservationDto);
            return new Response(res, start);
        } catch (Exception e){
            return new Response(400, e.getMessage(), start);
        }
    }

    @Override
    @PostMapping(value = "/listing")
    public Response getReservationByListingId(@RequestBody ReservationDto reservationDto) {
        long start = System.currentTimeMillis();
        try {
            List<ReservationEntity> res = reservationService.getReservationByListingId(reservationDto);
            return new Response(res, start);
        } catch (Exception e){
            return new Response(400, e.getMessage(), start);
        }
    }
}
