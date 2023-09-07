package com.ntduong.next.dto.currency;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;



@Getter
@Setter
@NoArgsConstructor
public class CurrencyRateCreateDto {
    private String currency;
    private BigDecimal rate;
    private String createdby;
    private String updatedby;
    private String deletedby;
    private BigDecimal delflag;
    private int version;
}
