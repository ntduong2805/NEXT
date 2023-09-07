package com.ntduong.next.controller;

import com.ntduong.next.dto.PlaceDto;
import com.ntduong.next.util.Response;

public interface PlaceController {
    public Response create(PlaceDto placeDto);
}
