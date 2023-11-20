package com.ntduong.next.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class Response {
    public static final String SUCCESS = "success";
    public static final String FAIL = "failed";
    private int resultCode;
    private String resultDescription;
    private Object data;
    private String time;
    private int codeStatus;
    private String message;
    private String description;
    private long took;

    public Response(Integer codeStatus, DataResponse data, long start) {
        if (codeStatus == 200) {
            this.resultCode = 0;
            this.resultDescription = SUCCESS;
            this.data = data;
            LocalDateTime currentTime = LocalDateTime.now();
            this.time = currentTime.toString();
            this.codeStatus = 200;
            this.message = SUCCESS;
            this.description = "";
            this.took = System.currentTimeMillis() - start;
        } else if (codeStatus == 400) {
            this.resultCode = 0;
            this.resultDescription = FAIL;
            this.data = data;
            LocalDateTime currentTime = LocalDateTime.now();
            this.time = currentTime.toString();
            this.codeStatus = 400;
            this.message = SUCCESS;
            this.description = "";
            this.took = System.currentTimeMillis() - start;
        } else if (codeStatus == 409) {
            this.resultCode = 0;
            this.resultDescription = FAIL;
            this.data = data;
            LocalDateTime currentTime = LocalDateTime.now();
            this.time = currentTime.toString();
            this.codeStatus = 409;
            this.message = "Account registration failed";
            this.description = "";
            this.took = System.currentTimeMillis() - start;
        }
    }

    public Response(Object data, long start) {
        this.resultCode = 0;
        this.resultDescription = SUCCESS;
        this.data = data;
        LocalDateTime currentTime = LocalDateTime.now();
        this.time = currentTime.toString();
        this.codeStatus = 200;
        this.message = SUCCESS;
        this.description = "";
        this.took = System.currentTimeMillis() - start;
    }

    public Response(int codeStatus, String msg, long start) {
        this.resultCode = codeStatus;
        this.resultDescription = codeStatus == 200 ? SUCCESS : FAIL;
        this.data = null;
        LocalDateTime currentTime = LocalDateTime.now();
        this.time = currentTime.toString();
        this.codeStatus = codeStatus;
        this.message = msg;
        this.description = msg;
        this.took = System.currentTimeMillis() - start;
    }
}
