package com.ntduong.next.dto.review;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
public class ReviewResDto {
    private Long userId;
    private String username;
    private String avatar;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date createddate;
    private Double rating;
    private String content;

    public ReviewResDto(Double rating, String content) {
        this.rating = rating;
        this.content = content;
    }

    public ReviewResDto(Long userId, String username, String avatar, Date createddate, Double rating, String content) {
        this.userId = userId;
        this.username = username;
        this.avatar = avatar;
        this.createddate = createddate;
        this.rating = rating;
        this.content = content;
    }
}
