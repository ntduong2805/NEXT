package com.ntduong.next.dto.countrycode;
import lombok.*;
@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CountryCodeCreateDto {
    private String countryCode;
    private String countryCodeDna;
    private String countryName;
    private String continent;
    private Long gdpPerCapita;
    private Integer version;

}

