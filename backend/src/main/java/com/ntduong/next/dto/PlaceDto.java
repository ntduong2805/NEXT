package com.ntduong.next.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PlaceDto {
    private Long placeId;
    private List<String> addedImages;
    private String checkIn;
    private String checkOut;
    private String address;
    private String description;
    private String extraInfo;
    private String maxGuests;
    private List<String> perks;
    private String price;
    private String title;
}
