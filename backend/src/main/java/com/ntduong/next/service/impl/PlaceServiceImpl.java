package com.ntduong.next.service.impl;

import com.ntduong.next.dto.PlaceDto;
import com.ntduong.next.entity.ImageEntity;
import com.ntduong.next.entity.PlaceEntity;
import com.ntduong.next.repository.ImageRepository;
import com.ntduong.next.repository.PlaceRepository;
import com.ntduong.next.service.PlaceService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class PlaceServiceImpl implements PlaceService {
    @Autowired
    private PlaceRepository placeRepository;
    @Autowired
    private ImageRepository imageRepository;

    private static final String ZERO = "0";
    @Override
    public PlaceDto create(PlaceDto placeReqDto) {
        checkValidate(placeReqDto);
        PlaceEntity placeEntity = new PlaceEntity();
        placeEntity.setAddress(placeReqDto.getAddress());
        placeEntity.setCheckIn(Integer.parseInt(placeReqDto.getCheckIn()));
        placeEntity.setCheckOut(Integer.parseInt(placeReqDto.getCheckOut()));
        placeEntity.setDescription(placeEntity.getDescription());
        placeEntity.setExtraInfo(placeEntity.getExtraInfo());
        placeEntity.setMaxGuests(Integer.parseInt(placeReqDto.getMaxGuests()));
        placeEntity.setTitle(placeReqDto.getTitle());
        PlaceEntity placeRes = placeRepository.save(placeEntity);
        List<String> addedImages = placeReqDto.getAddedImages();
        List<ImageEntity> imageUrls = addedImages.stream().map(addedPhoto -> {
            ImageEntity imageEntity = new ImageEntity();
            imageEntity.setPlaceId(placeRes.getPlaceId());
            imageEntity.setImageUrl(addedPhoto);
            return imageEntity;
        }).collect(Collectors.toList());
        imageRepository.saveAll(imageUrls);
        PlaceDto res = new PlaceDto();
        BeanUtils.copyProperties(placeRes, res);
        res.setAddedImages(addedImages);
        return res;
    }
    public void checkValidate(PlaceDto placeReqDto) {
        if (Objects.isNull(placeReqDto)) throw new RuntimeException("Place is not null!");
        if (placeReqDto.getAddedImages().isEmpty()) throw new RuntimeException("Image is not empty!");
        if (placeReqDto.getAddress().isEmpty()) throw new RuntimeException("Address is not empty!");
        if (placeReqDto.getCheckIn().isEmpty() || ZERO.equals(placeReqDto.getCheckIn())) throw new RuntimeException("Check in is not empty or equal 0!");
        if (placeReqDto.getCheckOut().isEmpty() || ZERO.equals(placeReqDto.getCheckOut())) throw new RuntimeException("Check out is not empty or equal 0!");
        if (placeReqDto.getDescription().isEmpty()) throw new RuntimeException("Description is not empty!");
        if (placeReqDto.getExtraInfo().isEmpty()) throw new RuntimeException("Extra info is not empty!");
        if (placeReqDto.getPrice().isEmpty() || ZERO.equals(placeReqDto.getPrice())) throw new RuntimeException("Price is not empty or equal 0!");
        if (placeReqDto.getMaxGuests().isEmpty() || ZERO.equals(placeReqDto.getMaxGuests())) throw new RuntimeException("Max guest is not empty or equal 0!");
        if (placeReqDto.getTitle().isEmpty()) throw new RuntimeException("Title is not empty!");
    }
}
