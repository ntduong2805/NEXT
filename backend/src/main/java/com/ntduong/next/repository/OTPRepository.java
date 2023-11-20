package com.ntduong.next.repository;

import com.ntduong.next.entity.OTPEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface OTPRepository extends JpaRepository<OTPEntity, Long> {

    @Query("SELECT o FROM OTPEntity o WHERE o.userId = :userId and o.status = 0L ORDER BY o.otpId DESC")
    OTPEntity getOTPEntityByUserId(@Param("userId") Long userId);


    @Modifying
    @Transactional
    @Query("DELETE FROM OTPEntity o WHERE o.userId = :userId")
    void deleteOTPByUserId(@Param("userId") Long userId);
}
