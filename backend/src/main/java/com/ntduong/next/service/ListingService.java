package com.ntduong.next.service;

import com.ntduong.next.dto.listing.ListingDto;

import java.util.List;


public interface ListingService {
    public void create(ListingDto createDto);
    public List<ListingDto> getList();
    public ListingDto getListing(ListingDto listingDto);
}
