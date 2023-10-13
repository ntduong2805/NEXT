package com.ntduong.next.config;

import com.ntduong.next.entity.UserEntity;
import com.ntduong.next.repository.UserRepository;
import com.ntduong.next.service.impl.JwtServiceImpl;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;
import java.util.Date;


@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    JwtServiceImpl jwtService;

    @Autowired
    UserRepository userRepository;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        String auth = request.getHeader("Authorization");
        if (auth == null || !auth.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = auth.substring(7);
        try {
            String email = jwtService.extractEmail(token);
            System.out.printf("Email::" + email);

            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserEntity user = userRepository.getUserByEmail(email);
                if (jwtService.isTokenValid(token, user)) {
                    System.out.printf("token valid");

                    Collection<GrantedAuthority> authorities = user.getAuthorities();

                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(user, null, authorities);
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);

                    request.setAttribute("email", user.getEmail());
                }
            }

            filterChain.doFilter(request, response);
        } catch (ExpiredJwtException e) {
            // Xử lý ngoại lệ khi token hết hạn
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");

            String errorMessage = "JWT token has expired.";
            String jsonResponse = String.format("{\"timestamp\": \"%s\", \"codeStatus\": %d, \"error\": \"%s\", \"message\": \"%s\", \"path\": \"%s\"}",
                    new Date(), HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized", errorMessage, request.getRequestURI());

            response.getWriter().write(jsonResponse);
            response.getWriter().flush();
        }
    }

}
