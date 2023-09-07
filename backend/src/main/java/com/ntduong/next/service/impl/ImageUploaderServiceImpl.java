package com.ntduong.next.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.ntduong.next.dto.ImageReqDto;
import com.ntduong.next.dto.ImageResDto;
import com.ntduong.next.service.ImageUploaderService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ImageUploaderServiceImpl implements ImageUploaderService {

    @Value("${cloudinary.cloud-name}")
    private String cloudName;

    @Value("${cloudinary.api-key}")
    private String apiKey;

    @Value("${cloudinary.api-secret}")
    private String apiSecret;

    @Override
    public ImageResDto uploadImageByLink(ImageReqDto imageReqDto) {
        Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret
        ));
        try {
            String imageUrl = imageReqDto.getUrl();

            // Tải hình ảnh trực tiếp từ URL và lưu vào Cloudinary
            Map uploadResult = cloudinary.uploader().upload(imageUrl, ObjectUtils.emptyMap());

            imageUrl = uploadResult.get("url").toString();
            ImageResDto imageResDto = new ImageResDto();
            imageResDto.setImageUrl(imageUrl);

            return imageResDto;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<String> uploadImages(MultipartFile[] photos) throws IOException {
        List<String> imageUrls = new ArrayList<>();
//        for (MultipartFile photo : photos) {
//            Map uploadResult = cloudinary.uploader().upload(photo.getBytes(), ObjectUtils.emptyMap());
//            String imageUrl = (String) uploadResult.get("secure_url");
//            imageUrls.add(imageUrl);
//        }

        return imageUrls;
    }
}
