package com.ntduong.next.repository;

import com.ntduong.next.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    @Query("SELECT u FROM UserEntity u WHERE u.email = :email")
    public UserEntity getUserByEmail(String email);

    public Optional<UserEntity> findByUsername(String username);
    public Optional<UserEntity> findByEmail(String email);
}
