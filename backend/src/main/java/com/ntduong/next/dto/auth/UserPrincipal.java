package com.ntduong.next.dto.auth;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.Map;

@Setter
@Getter
public class UserPrincipal {
    private static final long serialVersionUID = 1L;

    private Collection<? extends GrantedAuthority> authorities;
    private Map<Long, String> roles;
    private Long id;
    private String password;
    private String username;
    private String email;
    private boolean accountNonExpired = true;
    private boolean accountNonLocked = true;
    private boolean credentialsNonExpired = true;
    private boolean enabled = true;
}
