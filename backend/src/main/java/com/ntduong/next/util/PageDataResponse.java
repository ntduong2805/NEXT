package com.ntduong.next.util;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PageDataResponse {
    private Object datas;
    private Long currentPage;
    private Long offsetPage;
    private Long pageSize;
    private String sortDirection;


    public PageDataResponse(Long offsetPage, Long pageSize, Long currentPage, Object datas) {
        this.currentPage = currentPage;
        this.offsetPage = offsetPage;
        this.pageSize = pageSize;
        this.datas = datas;
    }
}
