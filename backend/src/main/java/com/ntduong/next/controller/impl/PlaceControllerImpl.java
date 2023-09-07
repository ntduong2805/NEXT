package com.ntduong.next.controller.impl;

import com.ntduong.next.controller.PlaceController;
import com.ntduong.next.dto.PlaceDto;
import com.ntduong.next.service.PlaceService;
import com.ntduong.next.util.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v2/place")
public class PlaceControllerImpl implements PlaceController {
    @Autowired
    public PlaceService placeService;

    @PostMapping("/create")
    @Override
    public Response create(@RequestBody PlaceDto placeDto) {
        long start = System.currentTimeMillis();
        try {
            PlaceDto res = placeService.create(placeDto);
            return new Response(res, start);
        } catch (Exception e) {
            return new Response(400, e.getMessage(), start);
        }
    }
}
