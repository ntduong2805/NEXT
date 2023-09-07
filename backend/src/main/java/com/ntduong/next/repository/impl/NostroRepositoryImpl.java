//package com.example.todo.repository.impl;
//
//import com.example.todo.dto.nostro.ListNostroResponseDto;
//import com.example.todo.dto.nostro.NostroResponseDto;
//import com.example.todo.dto.nostro.NostroSearchDto;
//import com.example.todo.entity.Nostro;
//import com.example.todo.repository.NostroRepository;
//import com.example.todo.repository.NostroSearchRepository;
//import jakarta.persistence.EntityManager;
//import jakarta.persistence.Query;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Repository;
//
//import java.text.DecimalFormat;
//import java.util.List;
//import java.util.Optional;
//import java.util.stream.Collectors;
//
//@Repository
//public class NostroRepositoryImpl implements NostroSearchRepository {
//
//    @Autowired
////    private EntityManager entityManager;a
////
//    @Override
//    public ListNostroResponseDto search(NostroSearchDto nostroSearchDto, int page, int pageSize) {
//        String q = "SELECT a FROM Nostro a WHERE 1=1";
//
//        if(nostroSearchDto.getName() != null){
//            q += " AND a.name = '"+nostroSearchDto.getName()+"'";
//        }
//
//        if(nostroSearchDto.getBic() != null){
//            q += " AND a.bic = '"+nostroSearchDto.getBic()+"'";
//        }
//
//        if(nostroSearchDto.getCurrency() != null){
//            q += " AND a.currency = '"+nostroSearchDto.getCurrency()+"'";
//        }
//
//        if(nostroSearchDto.getNostroid() != 0){
//            q += " AND a.nostroid = "+nostroSearchDto.getNostroid();
//        }
//
//        if(nostroSearchDto.getStatus() != 0){
//            q += " AND a.status = "+nostroSearchDto.getStatus();
//        }
//
//        if(nostroSearchDto.getPriority() != 0){
//            q += " AND a.priority = "+nostroSearchDto.getPriority();
//        }
//
//        if(nostroSearchDto.getTransaction_rate() != 0){
//            q += " AND a.transaction_rate = "+nostroSearchDto.getTransaction_rate();
//        }
//
//        List<Nostro> allNostro = entityManager.createQuery(q).getResultList();
//
//
//        q += " ORDER BY a.nostroid LIMIT "+pageSize+" OFFSET "+((page-1)*pageSize);
//
//        Query query = entityManager.createQuery(q);
//        List<Nostro> nostroList = query.getResultList();
//        int totalPage = Integer.parseInt(new DecimalFormat("#").format(allNostro.size()/pageSize));
//        return ListNostroResponseDto.builder()
//                .datas(nostroList.stream().map(nostro -> nostroMapper(nostro)).collect(Collectors.toList()))
//                .totalElements(nostroList.size())
//                .totalData(allNostro.size())
//                .totalPage(totalPage)
//                .canNext(page < totalPage)
//                .canPrevious(page > 1)
//                .currentPage(page)
//                .sortDirection("ASC")
//                .pageSize(pageSize)
//                .build();
//    }
//
//
//    private NostroResponseDto nostroMapper(Nostro nostro) {
//        NostroResponseDto nostroResponseDto = NostroResponseDto.builder()
//                .nostroid(nostro.getNostroid())
//                .bic(nostro.getBic())
//                .name(nostro.getName())
//                .currency(nostro.getCurrency())
//                .status(nostro.getStatus())
//                .priority(nostro.getPriority())
//                .createddate(nostro.getCreateddate())
//                .transaction_rate(nostro.getTransaction_rate())
//                .createdby(nostro.getCreatedby())
//                .updateddate(nostro.getUpdateddate())
//                .updatedby(nostro.getUpdatedby())
//                .deleteddate(nostro.getDeleteddate())
//                .deletedby(nostro.getDeletedby())
//                .delflag(nostro.getDelflag())
//                .created_operator_branch(nostro.getCreated_operator_branch())
//                .updated_operator_branch(nostro.getUpdated_operator_branch())
//                .build();
//        return nostroResponseDto;
//    }
//}
