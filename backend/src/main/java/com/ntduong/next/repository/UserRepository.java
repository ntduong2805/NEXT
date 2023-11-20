package com.ntduong.next.repository;

import com.ntduong.next.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    @Query("SELECT u FROM UserEntity u WHERE u.email = :email")
    public UserEntity getUserByEmail(String email);

    public Optional<UserEntity> findByUsername(String username);
    public Optional<UserEntity> findByEmail(String email);


    @Modifying
    @Transactional
    @Query("UPDATE UserEntity u SET u.isVerifyEmail = 1L WHERE u.userId = :userId")
    public void verifyEmail(@Param("userId") Long userId);

    @Modifying
    @Transactional
    @Query("UPDATE UserEntity u SET u.avatar = :avatar WHERE u.userId = :userId")
    public void uploadAvatar(@Param("avatar") String avatar, @Param("userId") Long userId);
}
