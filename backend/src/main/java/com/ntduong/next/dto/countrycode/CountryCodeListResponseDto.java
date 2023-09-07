package com.ntduong.next.dto.countrycode;
import lombok.*;

import java.util.List;
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Data
@Builder
public class CountryCodeListResponseDto {
    private long totalData;
    private long totalElements;
    private int currentPage;
    private int totalPage;
    private int pageSize;
    private String sortDirection;
    private boolean canNext;
    private boolean canPrevious;
    private List<CountryCodeResponseDto> datas;
}
