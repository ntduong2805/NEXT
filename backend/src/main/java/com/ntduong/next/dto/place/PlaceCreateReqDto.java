package com.ntduong.next.dto.place;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class PlaceCreateReqDto {
    private Long placeId;
    private String title;
    private String category;
    private String description;
    private String address;
    private Long bathroomCount;
    private Long guestCount;
    private Long roomCount;
    private String price;
    private String location;
    private List<String> imageSrc;
    private Long userId;
    private String owner;
    private String avatar;
}
