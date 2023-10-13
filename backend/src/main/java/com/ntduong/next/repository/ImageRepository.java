package com.ntduong.next.repository;

import com.ntduong.next.entity.ImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<ImageEntity, Long> {
    List<ImageEntity> getImageEntitiesByListingId(Long listingId);
    @Query("SELECT i.url FROM ImageEntity i WHERE i.listingId = :listingId")
    List<String> getUrlByListingId(Long listingId);
}
