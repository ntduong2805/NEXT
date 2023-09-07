package com.ntduong.next.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Setter
@Getter
public class ImageUploadReqDto {
    private List<MultipartFile> images;
}
