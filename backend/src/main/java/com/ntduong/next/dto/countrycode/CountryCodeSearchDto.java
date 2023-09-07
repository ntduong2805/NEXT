package com.ntduong.next.dto.countrycode;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CountryCodeSearchDto {
    private Long countryCodeId;
    private String countryCode;
    private String countryCodeDna;
    private String countryName;
    private String continent;
    private String createdby;
    private String updatedby;
    private String deletedby;
    private Long gdpPerCapita;

}
