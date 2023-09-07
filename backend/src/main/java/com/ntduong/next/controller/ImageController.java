package com.ntduong.next.controller;

import com.ntduong.next.dto.ImageReqDto;
import com.ntduong.next.util.Response;
import org.springframework.web.multipart.MultipartFile;

public interface ImageController {
    public Response uploadImageByLink(ImageReqDto imageReqDto);
    public Response uploadImages(MultipartFile[] photos);
}
