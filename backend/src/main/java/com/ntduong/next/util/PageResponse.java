package com.ntduong.next.util;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class PageResponse {
    private int resultCode;
    private String resultDescription;
    private Object data;
    private String time;
    private int codeStatus;
    private String messageStatus;
    private String description;

    private long took;

    public PageResponse(Integer codeStatus, PageDataResponse data, long took) {
        if (codeStatus == 200) {
            this.resultCode = 0;
            this.resultDescription = "success";
            this.data = data;

            LocalDateTime currentTime = LocalDateTime.now();
            this.time = currentTime.toString();
            this.codeStatus = 200;
            this.messageStatus = "success";
            this.description = "";

            this.took = took;
        }
    }
}
