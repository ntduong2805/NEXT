package com.ntduong.next.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.ntduong.next.config.CloudiaryConfig;
import com.ntduong.next.exception.DetailException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryService {

    @Autowired
    private CloudiaryConfig cloudiaryConfig;

    public String upload(MultipartFile file)  {
        try {
            Cloudinary cloudinary = cloudiaryConfig.getCloudinary();
            // Upload the file to Cloudinary
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            return (String) uploadResult.get("url");
        } catch (IOException e) {
            e.printStackTrace();
            throw new DetailException("Error uploading image.");
        }
    }
}

