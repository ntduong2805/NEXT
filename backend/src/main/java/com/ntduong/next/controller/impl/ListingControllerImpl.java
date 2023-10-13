package com.ntduong.next.controller.impl;

import com.ntduong.next.controller.ListingController;
import com.ntduong.next.dto.listing.ListingDto;
import com.ntduong.next.service.ListingService;
import com.ntduong.next.util.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v2/listing")
public class ListingControllerImpl implements ListingController {

    @Autowired
    private ListingService listingService;
    @Override
    @PostMapping(value = "/create")
    public Response create(@RequestBody ListingDto createDto) {
        long start = System.currentTimeMillis();
        try {
            listingService.create(createDto);
            return new Response(null, start);
        } catch (Exception e){
            return new Response(400, e.getMessage(), start);
        }
    }

    @Override
    @PostMapping(value = "/get-list")
    public Response getList() {
        long start = System.currentTimeMillis();
        try {
            List<ListingDto> res = listingService.getList();
            return new Response(res, start);
        } catch (Exception e){
            return new Response(400, e.getMessage(), start);
        }
    }

    @Override
    @PostMapping(value = "/get")
    public Response getListing(@RequestBody  ListingDto listingDto) {
        long start = System.currentTimeMillis();
        try {
            ListingDto res = listingService.getListing(listingDto);
            return new Response(res, start);
        } catch (Exception e){
            return new Response(400, e.getMessage(), start);
        }
    }
}
