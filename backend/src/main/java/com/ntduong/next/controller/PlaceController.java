package com.ntduong.next.controller;

import com.ntduong.next.dto.place.PlaceCategoryReqDto;
import com.ntduong.next.dto.place.PlaceCreateReqDto;
import com.ntduong.next.dto.place.PlaceGetReqDto;
import com.ntduong.next.util.Response;

public interface PlaceController {
    public Response create(PlaceCreateReqDto createDto);
    public Response getListPlace();
    public Response getPlace(PlaceGetReqDto placeDto);
    public Response getListPlaceByOwner();
    public Response getListPlaceFavorites();
    public Response deletePlace(PlaceGetReqDto placeDto);

    public Response getPlaceByCategory(PlaceCategoryReqDto reqDto);
}
