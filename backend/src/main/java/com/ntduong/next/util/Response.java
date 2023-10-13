package com.ntduong.next.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class Response {
    private int resultCode;
    private String resultDescription;
    private Object data;
    private String time;
    private int codeStatus;
    private String message;
    private String description;
    private long process;
    private long took;

    public Response(Integer codeStatus, DataResponse data, long took, long start) {
        if (codeStatus == 200) {
            this.resultCode = 0;
            this.resultDescription = "success";
            this.data = data != null ? data : null;
            LocalDateTime currentTime = LocalDateTime.now();
            this.time = currentTime.toString();
            this.codeStatus = 200;
            this.message = "success";
            this.description = "";
            this.took = took;
            this.process = System.currentTimeMillis() - start;
        } else if (codeStatus == 400) {
            this.resultCode = 0;
            this.resultDescription = "unsuccessful";
            this.data = data != null ? data : null;
            LocalDateTime currentTime = LocalDateTime.now();
            this.time = currentTime.toString();
            this.codeStatus = 400;
            this.message = "success";
            this.description = "";
            this.took = took;
            this.process = System.currentTimeMillis() - start;
        } else if (codeStatus == 409) {
            this.resultCode = 0;
            this.resultDescription = "unsuccessful";
            this.data = data != null ? data : null;
            LocalDateTime currentTime = LocalDateTime.now();
            this.time = currentTime.toString();
            this.codeStatus = 409;
            this.message = "Account registration failed";
            this.description = "";
            this.took = took;
            this.process = System.currentTimeMillis() - start;
        }
    }

    public Response(Object data, long start) {
        this.resultCode = 0;
        this.resultDescription = "success";
        this.data = data != null ? data : null;
        LocalDateTime currentTime = LocalDateTime.now();
        this.time = currentTime.toString();
        this.codeStatus = 200;
        this.message = "success";
        this.description = "";
        this.took = 1;
        this.process = System.currentTimeMillis() - start;
    }

    public Response(int codeStatus, String msg, long start) {
        this.resultCode = codeStatus;
        this.resultDescription = codeStatus == 200 ? "success" : "failed";
        this.data = null;
        LocalDateTime currentTime = LocalDateTime.now();
        this.time = currentTime.toString();
        this.codeStatus = codeStatus;
        this.message = msg;
        this.description = "";
        this.took = 1;
        this.process = System.currentTimeMillis() - start;
    }
}
