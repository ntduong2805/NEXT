package com.ntduong.next.service;

import com.ntduong.next.dto.place.PlaceDto;
import com.ntduong.next.dto.place.PlaceGetReqDto;
import com.ntduong.next.dto.place.PlaceResDto;

import java.util.List;


public interface PlaceService {
    public void create(PlaceDto createDto);
    public List<PlaceDto> getListPlace();
    public PlaceResDto getPlace(PlaceGetReqDto placeDto);
    public List<PlaceDto> getListPlaceByOwner();
    public List<PlaceDto> getListPlaceFavorite();
    public void deletePlace(PlaceDto placeDto);
}
