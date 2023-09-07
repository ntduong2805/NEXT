package com.ntduong.next.repository;

import com.ntduong.next.entity.PlacePeckEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlacePeckRepository extends JpaRepository<PlacePeckEntity, Long> {
}
