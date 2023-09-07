//package com.example.todo.repository.impl;
//
//import com.example.todo.dto.countrycode.CountryCodeListResponseDto;
//import com.example.todo.dto.countrycode.CountryCodeResponseDto;
//import com.example.todo.dto.countrycode.CountryCodeSearchDto;
//import com.example.todo.entity.CountryCode;
//import com.example.todo.repository.CountryCodeSearchRepository;
//import org.springframework.stereotype.Repository;
//
//import javax.persistence.EntityManager;
//import javax.persistence.PersistenceContext;
//import javax.persistence.Query;
//import java.text.DecimalFormat;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Repository
//public class CountryCodeSearchRepositoryImpl implements CountryCodeSearchRepository {
//    @PersistenceContext
//    private EntityManager entityManager;
//    @Override
////    public CountryCodeListResponseDto search(CountryCodeSearchDto countryCodeSearchDto, Integer page, Integer pageSize) {
////        String sqlQuery = "SELECT a FROM CountryCode a WHERE 1 = 1";
////        if(countryCodeSearchDto.getCountryCode() != null){
////            sqlQuery += " AND a.countryCode = '"+countryCodeSearchDto.getCountryCode()+"'";
////        }
////        if(countryCodeSearchDto.getCountryCodeDna() != null){
////            sqlQuery += " AND a.countryCodeDna = '"+countryCodeSearchDto.getCountryCodeDna()+"'";
////        }
////        if(countryCodeSearchDto.getCountryName() != null){
////            sqlQuery += " AND a.countryName = '"+countryCodeSearchDto.getCountryName()+"'";
////        }
////        if(countryCodeSearchDto.getContinent() != null){
////            sqlQuery += " AND a.continent = '"+countryCodeSearchDto.getContinent()+"'";
////        }
////        if(countryCodeSearchDto.getUpdatedby() != null){
////            sqlQuery += " AND a.updatedby = '"+countryCodeSearchDto.getUpdatedby()+"'";
////        }
////        if(countryCodeSearchDto.getCreatedby() != null){
////            sqlQuery += " AND a.createdby = '"+countryCodeSearchDto.getCreatedby()+"'";
////        }
////        if(countryCodeSearchDto.getDeletedby() != null){
////            sqlQuery += " AND a.deletedby = '"+countryCodeSearchDto.getDeletedby()+"'";
////        }
////        if(countryCodeSearchDto.getGdpPerCapita() != null && countryCodeSearchDto.getGdpPerCapita() != 0){
////            sqlQuery += " AND a.gdpPerCapita = '"+countryCodeSearchDto.getGdpPerCapita()+"'";
////        }
////        List<CountryCode> allCountryCode = entityManager.createQuery(sqlQuery).getResultList();
////        sqlQuery += " ORDER BY a.countryCodeId LIMIT "+pageSize+" OFFSET "+((page-1)*pageSize);
////        Query query = entityManager.createQuery(sqlQuery);
////        List<CountryCode> countryCodes = query.getResultList();
////        int totalPage = Integer.parseInt(new DecimalFormat("#").format(allCountryCode.size()/pageSize));
////        return CountryCodeListResponseDto.builder()
////                .datas(countryCodes.stream().map(countryCode -> mapperCountryCode(countryCode)).collect(Collectors.toList()))
////                .totalElements(countryCodes.size())
////                .totalData(allCountryCode.size())
////                .totalPage(totalPage)
////                .canNext(page < totalPage)
////                .canPrevious(page > 1)
////                .currentPage(page)
////                .sortDirection("ASC")
////                .pageSize(pageSize)
////                .build();
////    }
////    public CountryCodeResponseDto mapperCountryCode(CountryCode countryCode) {
////        CountryCodeResponseDto countryCodeResponseDto = CountryCodeResponseDto.builder()
////                .countryCode(countryCode.getCountryCode())
////                .countryCodeDna(countryCode.getCountryCodeDna())
////                .countryName(countryCode.getCountryName())
////                .continent(countryCode.getContinent())
////                .updatedby(countryCode.getUpdatedby())
////                .updatedDate(countryCode.getUpdateddate())
////                .createdby(countryCode.getCreatedby())
////                .createdDate(countryCode.getCreateddate())
////                .deletedby(countryCode.getDeletedby())
////                .deletedDate(countryCode.getDeleteddate())
////                .gdpPerCapita(countryCode.getGdpPerCapita())
////                .delflag(countryCode.getDelflag())
////                .version(countryCode.getVersion())
////                .build();
////        return countryCodeResponseDto;
////    }
//
//
//}
