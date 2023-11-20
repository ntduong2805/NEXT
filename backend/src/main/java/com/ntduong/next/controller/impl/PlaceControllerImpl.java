package com.ntduong.next.controller.impl;

import com.ntduong.next.constant.ApiConstant;
import com.ntduong.next.controller.PlaceController;
import com.ntduong.next.dto.place.PlaceDto;
import com.ntduong.next.dto.place.PlaceGetReqDto;
import com.ntduong.next.dto.place.PlaceResDto;
import com.ntduong.next.service.PlaceService;
import com.ntduong.next.util.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(ApiConstant.API_V2 + ApiConstant.PLACE)
public class PlaceControllerImpl implements PlaceController {

    public static final String SUCCESS = "Success";
    public static final String FAIL = "Fail";

    @Autowired
    private PlaceService placeService;
    @Override
    @PostMapping(value = ApiConstant.CREATE)
    public Response create(@RequestBody PlaceDto createDto) {
        long start = System.currentTimeMillis();
        try {
            placeService.create(createDto);
            return new Response(null, start);
        } catch (Exception e){
            return new Response(ApiConstant.BAD_REQUEST, e.getMessage(), start);
        }
    }

    @Override
    @PostMapping(value = ApiConstant.GET_LIST)
    public Response getListPlace() {
        long start = System.currentTimeMillis();
        try {
            List<PlaceDto> res = placeService.getListPlace();
            return new Response(res, start);
        } catch (Exception e){
            return new Response(ApiConstant.BAD_REQUEST, e.getMessage(), start);
        }
    }

    @Override
    @PostMapping(value = ApiConstant.GET)
    public Response getPlace(@RequestBody PlaceGetReqDto placeDto) {
        long start = System.currentTimeMillis();
        try {
            PlaceResDto res = placeService.getPlace(placeDto);
            return new Response(res, start);
        } catch (Exception e){
            return new Response(ApiConstant.BAD_REQUEST, e.getMessage(), start);
        }
    }

    @Override
    @PostMapping(value = ApiConstant.GET_LIST_OWNER)
    public Response getListPlaceByOwner() {
        long start = System.currentTimeMillis();
        try {
            List<PlaceDto> res = placeService.getListPlaceByOwner();
            return new Response(res, start);
        } catch (Exception e){
            return new Response(ApiConstant.BAD_REQUEST, e.getMessage(), start);
        }
    }

    @Override
    @PostMapping(value = ApiConstant.GET_LIST_FAVORITES)
    public Response getListPlaceFavorites() {
        long start = System.currentTimeMillis();
        try {
            List<PlaceDto> res = placeService.getListPlaceFavorite();
            return new Response(res, start);
        } catch (Exception e){
            return new Response(ApiConstant.BAD_REQUEST, e.getMessage(), start);
        }
    }

    @Override
    @PostMapping(value = ApiConstant.DELETE)
    public Response deletePlace(@RequestBody PlaceDto placeDto) {
        long start = System.currentTimeMillis();
        try {
            placeService.deletePlace(placeDto);
            return new Response(SUCCESS, start);
        } catch (Exception e){
            return new Response(FAIL, start);
        }
    }
}
