package com.ntduong.next.controller.impl;
import com.ntduong.next.controller.ImageController;
import com.ntduong.next.dto.ImageReqDto;
import com.ntduong.next.dto.ImageResDto;
import com.ntduong.next.service.ImageUploaderService;
import com.ntduong.next.util.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v2/image")
public class ImageControllerImpl implements ImageController {

    @Autowired
    ImageUploaderService imageUploaderService;

    @PostMapping("/upload-by-url")
    public Response uploadImageByLink(@RequestBody ImageReqDto imageReqDto) {
        long start = System.currentTimeMillis();
        try {
            ImageResDto url = imageUploaderService.uploadImageByLink(imageReqDto);
            return new Response(url, start);
        } catch (Exception e) {
            return new Response(400, e.getMessage(), start);
        }

    }

    @PostMapping("/upload-image")
    @Override
    public Response uploadImages(@RequestBody MultipartFile[] photos) {
        long start = System.currentTimeMillis();
        try {
            List<String> urls = imageUploaderService.uploadImages(photos);
            return new Response(urls, start);
        } catch (Exception e) {
            return new Response(400, e.getMessage(), start);
        }
    }
}
