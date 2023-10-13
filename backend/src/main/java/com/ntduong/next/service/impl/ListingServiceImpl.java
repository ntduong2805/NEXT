package com.ntduong.next.service.impl;

import com.ntduong.next.dto.listing.ListingDto;
import com.ntduong.next.entity.ImageEntity;
import com.ntduong.next.entity.ListingEntity;
import com.ntduong.next.exception.DetailException;
import com.ntduong.next.repository.ImageRepository;
import com.ntduong.next.repository.ListingRepository;
import com.ntduong.next.service.ListingService;
import com.ntduong.next.util.CommonDateUtil;
import com.ntduong.next.util.UserProfileUtils;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ListingServiceImpl implements ListingService {

    @Autowired
    private ListingRepository listingRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Override
    public void create(ListingDto createDto) {
        checkValidate(createDto);
        try {
            ListingEntity listingEntity = new ListingEntity();
            listingEntity.setAddress(createDto.getAddress());
            listingEntity.setCategory(createDto.getCategory());
            listingEntity.setBathroomCount(createDto.getBathroomCount());
            listingEntity.setDescription(createDto.getDescription());
            listingEntity.setGuestCount(createDto.getGuestCount());
            listingEntity.setLocation(createDto.getLocation());
            listingEntity.setPrice(Long.parseLong(createDto.getPrice()));
            listingEntity.setRoomCount(createDto.getRoomCount());
            listingEntity.setTitle(createDto.getTitle());
            listingEntity.setCreateddate(CommonDateUtil.getSystemDateTime());
            listingEntity.setCreatedby(UserProfileUtils.getEmailLogin());
            ListingEntity createEntity = listingRepository.save(listingEntity);
            List<String> imageSrcs = createDto.getImageSrc();
            List<ImageEntity> lstImage = imageSrcs.stream().map(imageSrc -> {
                ImageEntity imageEntity = new ImageEntity();
                imageEntity.setListingId(createEntity.getListingId());
                imageEntity.setUrl(imageSrc);
                return imageEntity;
            }).collect(Collectors.toList());
            imageRepository.saveAll(lstImage);
        } catch (Exception e) {
            throw new DetailException(e.getMessage());
        }
    }

    @Override
    public List<ListingDto> getList() {
        List<ListingEntity> listingEntities = listingRepository.findAll();
        return listingEntities.stream().map(listingEntity -> {
            ListingDto listing = new ListingDto();
            BeanUtils.copyProperties(listingEntity, listing);
            listing.setPrice(listingEntity.getPrice().toString());
            List<String> imgSrc = imageRepository.getUrlByListingId(listingEntity.getListingId());
            listing.setImageSrc(imgSrc);
            return listing;
        }).collect(Collectors.toList());
    }

    @Override
    public ListingDto getListing(ListingDto listingDto) {
        if (ObjectUtils.isEmpty(listingDto.getListingId())) {
            throw new DetailException("Listing Id is not null");
        }
        ListingEntity listing = listingRepository.getById(listingDto.getListingId());
        if (ObjectUtils.isEmpty(listing)) {
            throw new DetailException("Listing is not exist");
        }
        List<String> imageSrc = imageRepository.getUrlByListingId(listing.getListingId());
        ListingDto res = new ListingDto();
        BeanUtils.copyProperties(listing, res);
        res.setPrice(listing.getPrice().toString());
        res.setImageSrc(imageSrc);
        return res;
    }

    private void checkValidate(ListingDto req) {
        if (ObjectUtils.isEmpty(req.getAddress())){
            throw new DetailException("Addres is not null");
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
