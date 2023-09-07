package com.ntduong.next.dto.currency;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
public class CurrencyRateUpdateDto {
    private String currency;
    private BigDecimal rate;
    private String createdby;
    private String updatedby;
    private BigDecimal delflag;
}
