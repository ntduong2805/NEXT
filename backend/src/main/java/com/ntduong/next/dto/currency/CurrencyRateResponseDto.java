package com.ntduong.next.dto.currency;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.sql.Timestamp;


@Data
@AllArgsConstructor
public class CurrencyRateResponseDto {
    private BigInteger currency_rate_id;
    private String currency;
    private BigDecimal rate;
    private Timestamp createddate;
    private String createdby;
    private Timestamp updateddate;
    private String updatedby;
    private Timestamp deleteddate;
    private String deletedby;
    private BigDecimal delflag;
    private int version;
}
