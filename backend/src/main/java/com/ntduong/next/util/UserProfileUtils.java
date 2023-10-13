package com.ntduong.next.util;

import com.ntduong.next.entity.UserEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;


public class UserProfileUtils {
    public static Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }
    public static UserEntity getUserPrincipal() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserEntity userEntity = null;
        if (getAuthentication() != null) {
            userEntity = (UserEntity) getAuthentication().getPrincipal();
        }
        return userEntity;
    }

    public static String getEmailLogin() {
        return getUserPrincipal() != null ? getUserPrincipal().getEmail() : null;
    }
    public static String getUserLogin() {
        return getUserPrincipal() != null ? getUserPrincipal().getUsername() : null;
    }

    public static Long getUserId() {
        return getUserPrincipal() != null ? getUserPrincipal().getId() : null;
    }


}
