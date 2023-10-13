package com.ntduong.next.controller;

import com.ntduong.next.dto.listing.ListingDto;
import com.ntduong.next.util.Response;

public interface ListingController {
    public Response create(ListingDto createDto);
    public Response getList();
    public Response getListing(ListingDto listingDto);
}
