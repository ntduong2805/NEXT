package com.ntduong.next.dto.countrycode;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
@Setter
@Getter
@Builder

public class CountryCodeResponseDto {
    private String countryCode;
    private String countryCodeDna;
    private String countryName;
    private String continent;
    private Timestamp createdDate;
    private String createdby;
    private Timestamp updatedDate;
    private String updatedby;
    private Timestamp deletedDate;
    private String deletedby;
    private Long gdpPerCapita;
    private Integer delflag;
    private Integer version;
}

