package com.ntduong.next.dto.currency;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class CurrencyRateListResponseDto {
    private int currentPage;
    private long totalData;
    private int totalPage;
    private boolean canNext;
    private boolean canPrev;
    private int dataPerPage;
    private String sortDirection;

    private List<CurrencyRateResponseDto> currencyRateResponseDto;

}