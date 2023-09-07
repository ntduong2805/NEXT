package com.ntduong.next.util;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DataResponseJobCode {
    private Long totalData;
    private Object datas;

    public DataResponseJobCode(Object datas) {
        this.totalData = 0L;
        this.datas = datas;
    }
}