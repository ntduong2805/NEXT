package com.ntduong.next.service;

import com.ntduong.next.dto.place.PlaceCategoryReqDto;
import com.ntduong.next.dto.place.PlaceCreateReqDto;
import com.ntduong.next.dto.place.PlaceGetReqDto;
import com.ntduong.next.dto.place.PlaceResDto;

import java.util.List;


public interface PlaceService {
    public void create(PlaceCreateReqDto createDto);
    public List<PlaceResDto> getListPlace();
    public PlaceResDto getPlace(PlaceGetReqDto placeDto);
    public List<PlaceResDto> getListPlaceByOwner();
    public List<PlaceResDto> getListPlaceFavorite();
    public void deletePlace(PlaceGetReqDto placeDto);

    public List<PlaceResDto> getPlaceCategory(PlaceCategoryReqDto reqDto);

    public Long getOwnerId(Long placeId);
}
