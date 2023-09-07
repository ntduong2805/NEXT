package com.ntduong.next.service;

import com.ntduong.next.dto.ImageReqDto;
import com.ntduong.next.dto.ImageResDto;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


public interface ImageUploaderService {
    public ImageResDto uploadImageByLink(ImageReqDto imageReqDto);

    public List<String> uploadImages(MultipartFile[] photos) throws IOException;
}