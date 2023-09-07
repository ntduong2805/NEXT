package com.ntduong.next.util;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DataResponse {
    private Long totalData;
    private Object datas;


    public DataResponse(Object datas) {

        this.totalData = 0L;
        this.datas = datas;
    }
}
