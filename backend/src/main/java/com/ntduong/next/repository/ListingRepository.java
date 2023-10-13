package com.ntduong.next.repository;

import com.ntduong.next.entity.ListingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ListingRepository extends JpaRepository<ListingEntity, Long> {
}
