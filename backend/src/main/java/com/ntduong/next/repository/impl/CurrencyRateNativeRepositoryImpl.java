//package com.example.todo.repository.impl;
//
//import com.example.todo.dto.currency.CurrencyRateCreateDto;
//import com.example.todo.dto.currency.CurrencyRateSearchDto;
//import com.example.todo.entity.CurrencyRate;
//import com.example.todo.repository.CurrencyRateNativeRepository;
//import jakarta.persistence.EntityManager;
//import jakarta.persistence.PersistenceContext;
//import jakarta.persistence.Query;
//import jakarta.transaction.Transactional;
//import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
//import org.springframework.stereotype.Repository;
//
//import java.math.BigDecimal;
//import java.util.List;
//import java.util.Objects;
//
//
//@Repository
//public class CurrencyRateNativeRepositoryImpl implements CurrencyRateNativeRepository {
//    @PersistenceContext
//        private EntityManager entityManager;
//    ;
//        @Override
//        public List<CurrencyRate> findCurrencyRateByConditions(CurrencyRateSearchDto currencyRateSearchDto) {
//            String sqlQuery = "SELECT c FROM CurrencyRate c WHERE 1 = 1 ";
//            if ( Objects.nonNull(currencyRateSearchDto.getCurrency_rate_id()) ) {
//                sqlQuery += "AND c.currency_rate_id = :currency_rate_id ";
//            }
//            if ( Objects.nonNull(currencyRateSearchDto.getCurrency()) ) {
//                sqlQuery += "AND c.currency = :currency ";
//            }
//            if ( Objects.nonNull(currencyRateSearchDto.getRate())) {
//                sqlQuery += "AND c.rate = :rate ";
//            }
//            if ( Objects.nonNull(currencyRateSearchDto.getCreatedby())) {
//                sqlQuery += "AND c.createdby = :createdby ";
//            }
//            if ( Objects.nonNull(currencyRateSearchDto.getUpdatedby())) {
//                sqlQuery += "AND c.updatedby = :updatedby ";
//            }
//            if ( Objects.nonNull(currencyRateSearchDto.getDelflag())) {
//                sqlQuery += "AND c.delflag = :delflag ";
//            }
//
//
//            Query query = entityManager.createQuery(sqlQuery);
//            if (currencyRateSearchDto.getCurrency() != null) {
//                query.setParameter("currency", currencyRateSearchDto.getCurrency());
//            }
//            if (currencyRateSearchDto.getRate() != null) {
//                query.setParameter("rate", currencyRateSearchDto.getRate());
//            }
//            if (currencyRateSearchDto.getCreatedby() != null) {
//
//                query.setParameter("createdby", currencyRateSearchDto.getCreatedby());
//            }
//            if (currencyRateSearchDto.getUpdatedby() != null) {
//                query.setParameter("updatedby", currencyRateSearchDto.getUpdatedby());
//            }
//            if (currencyRateSearchDto.getDelflag() != null) {
//                query.setParameter("delflag", currencyRateSearchDto.getDelflag());
//            }
//            return query.getResultList();
//        }
//
//
//
//}
