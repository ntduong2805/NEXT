package com.ntduong.next.dto.place;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Setter
@Getter
@NoArgsConstructor
public class PlaceResDto {
    private Long placeId;
    private String title;
    private String category;
    private String description;
    private String address;
    private Long bathroomCount;
    private Long guestCount;
    private Long roomCount;
    private Long price;
    private String location;
    private List<String> imageSrc;
    private Long userId;
    private String owner;
    private String avatar;

    public PlaceResDto(Long placeId, String title, String category, String description, String address, Long bathroomCount, Long guestCount, Long roomCount, Long price, String location, Long userId, String owner, String avatar) {
        this.placeId = placeId;
        this.title = title;
        this.category = category;
        this.description = description;
        this.address = address;
        this.bathroomCount = bathroomCount;
        this.guestCount = guestCount;
        this.roomCount = roomCount;
        this.price = price;
        this.location = location;
        this.userId = userId;
        this.owner = owner;
        this.avatar = avatar;
    }
}
