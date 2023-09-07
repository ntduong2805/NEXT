package com.ntduong.next.util;

import com.ntduong.next.dto.auth.UserPrincipal;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class UserProfileUtils {
    public static Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }
    public static UserPrincipal getUserPrincipal() {
        UserPrincipal userPrincipal = null;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (getAuthentication() != null && getAuthentication().getPrincipal() instanceof UserPrincipal) {
            userPrincipal = (UserPrincipal) getAuthentication().getPrincipal();
        }
        return userPrincipal;
    }

    public static String getEmailLogin() {
        return getUserPrincipal() != null ? getUserPrincipal().getEmail() : null;
    }

    public static Long getUserId() {
        return getUserPrincipal() != null ? getUserPrincipal().getId() : null;
    }


}
