package com.ntduong.next.service.impl;

import com.ntduong.next.dto.place.PlaceCategoryReqDto;
import com.ntduong.next.dto.place.PlaceCreateReqDto;
import com.ntduong.next.dto.place.PlaceGetReqDto;
import com.ntduong.next.dto.place.PlaceResDto;
import com.ntduong.next.entity.ImageEntity;
import com.ntduong.next.entity.PlaceEntity;
import com.ntduong.next.exception.DetailException;
import com.ntduong.next.repository.ImageRepository;
import com.ntduong.next.repository.PlaceRepository;
import com.ntduong.next.repository.UserFavoriteRepository;
import com.ntduong.next.service.PlaceService;
import com.ntduong.next.util.CommonDateUtil;
import com.ntduong.next.util.UserProfileUtils;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlaceServiceImpl implements PlaceService {

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private UserFavoriteRepository userFavoriteRepository;

    @Override
    public void create(PlaceCreateReqDto createDto) {
        checkValidate(createDto);
        try {
            PlaceEntity placeEntity = new PlaceEntity();
            placeEntity.setAddress(createDto.getAddress().trim());
            placeEntity.setCategory(createDto.getCategory());
            placeEntity.setBathroomCount(createDto.getBathroomCount());
            placeEntity.setDescription(createDto.getDescription().trim());
            placeEntity.setGuestCount(createDto.getGuestCount());
            placeEntity.setLocation(createDto.getLocation());
            placeEntity.setPrice(Long.parseLong(createDto.getPrice()));
            placeEntity.setRoomCount(createDto.getRoomCount());
            placeEntity.setTitle(createDto.getTitle().trim());
            placeEntity.setCreateddate(CommonDateUtil.getSystemDateTime());
            placeEntity.setUserId(UserProfileUtils.getUserId());
            PlaceEntity createEntity = placeRepository.save(placeEntity);
            List<String> imageSrcs = createDto.getImageSrc();
            List<ImageEntity> lstImage = imageSrcs.stream().map(imageSrc -> {
                ImageEntity imageEntity = new ImageEntity();
                imageEntity.setPlaceId(createEntity.getPlaceId());
                imageEntity.setUrl(imageSrc);
                return imageEntity;
            }).collect(Collectors.toList());
            lstImage.get(0).setIsPrimary(1L);
            imageRepository.saveAll(lstImage);
        } catch (Exception e) {
            throw new DetailException(e.getMessage());
        }
    }

    @Override
    public List<PlaceResDto> getListPlace() {
        List<PlaceEntity> placeEntities = placeRepository.getListPlace();
        return setPlaceResDtos(placeEntities);
    }

    @Override
    public PlaceResDto getPlace(PlaceGetReqDto placeDto) {
         if (ObjectUtils.isEmpty(placeDto.getPlaceId())) {
            throw new DetailException("Place Id is not null");
        }
        PlaceResDto place = placeRepository.getPlace(placeDto.getPlaceId());
        if (ObjectUtils.isEmpty(place)) {
            throw new DetailException("Place is not exist");
        }
        List<String> imageSrc = imageRepository.getUrlByPlaceId(place.getPlaceId());
        place.setImageSrc(imageSrc);
        return place;
    }

    @Override
    public List<PlaceResDto> getListPlaceByOwner() {
        List<PlaceEntity> placeEntities = placeRepository.getListPlaceByOwner(UserProfileUtils.getUserId());
        return setPlaceResDtos(placeEntities);
    }

    @Override
    public List<PlaceResDto> getListPlaceFavorite() {
        List<Long> favorites = userFavoriteRepository.getPlaceIdByUserId(UserProfileUtils.getUserId());
        List<PlaceEntity> lstPlace = placeRepository.getListPlaceFavorites(favorites);
        return setPlaceResDtos(lstPlace);
    }

    @Override
    public void deletePlace(PlaceGetReqDto placeDto) {
        if (ObjectUtils.isEmpty(placeDto.getPlaceId())){
            throw new DetailException("Place Id is not null");
        }
        placeRepository.deleteById(placeDto.getPlaceId());
    }

    @Override
    public List<PlaceResDto> getPlaceCategory(PlaceCategoryReqDto reqDto) {
        if (ObjectUtils.isEmpty(reqDto.getCategory())) {
            throw new DetailException("Category is null");
        }
        List<PlaceEntity> placeEntities = placeRepository.getPlaceByCategory(reqDto.getCategory());
        return setPlaceResDtos(placeEntities);
    }

    @Override
    public Long getOwnerId(Long placeId) {
        return placeRepository.getUserIdByPlaceId(placeId);
    }

    private List<PlaceResDto> setPlaceResDtos(List<PlaceEntity> placeEntities) {
        return placeEntities.stream().map(placeEntity -> {
            PlaceResDto placeDto = new PlaceResDto();
            BeanUtils.copyProperties(placeEntity, placeDto);
            List<String> imgSrc = imageRepository.getUrlByPlaceId(placeEntity.getPlaceId());
            placeDto.setImageSrc(imgSrc);
            return placeDto;
        }).collect(Collectors.toList());
    }


    private void checkValidate(PlaceCreateReqDto req) {
        if (ObjectUtils.isEmpty(req.getAddress())){
            throw new DetailException("Address is not null");
        }
        if (ObjectUtils.isEmpty(req.getCategory())){
            throw new DetailException("Category is not null");
        }
        if (ObjectUtils.isEmpty(req.getDescription())){
            throw new DetailException("Description is not null");
        }
        if (ObjectUtils.isEmpty(req.getPrice())){
            throw new DetailException("Price is not null");
        }
        if (ObjectUtils.isEmpty(req.getBathroomCount())){
            throw new DetailException("Bathroom count is not null");
        }
        if (ObjectUtils.isEmpty(req.getGuestCount())){
            throw new DetailException("Guest count is not null");
        }
        if (ObjectUtils.isEmpty(req.getRoomCount())){
            throw new DetailException("Room count is not null");
        }
        if (ObjectUtils.isEmpty(req.getLocation())){
            throw new DetailException("Location is not null");
        }
        if (ObjectUtils.isEmpty(req.getTitle())){
            throw new DetailException("Title is not null");
        }
        if (ObjectUtils.isEmpty(req.getImageSrc())){
            throw new DetailException("Image is not null");
        }

    }
}
