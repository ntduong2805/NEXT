package com.ntduong.next.controller;

import com.ntduong.next.dto.place.PlaceDto;
import com.ntduong.next.dto.place.PlaceGetReqDto;
import com.ntduong.next.util.Response;

public interface PlaceController {
    public Response create(PlaceDto createDto);
    public Response getListPlace();
    public Response getPlace(PlaceGetReqDto placeDto);
    public Response getListPlaceByOwner();
    public Response getListPlaceFavorites();
    public Response deletePlace(PlaceDto placeDto);
}
