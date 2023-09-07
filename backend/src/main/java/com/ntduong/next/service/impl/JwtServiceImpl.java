package com.ntduong.next.service.impl;

import com.ntduong.next.entity.UserEntity;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtServiceImpl {

    private final String JWT_KEY = "3677397A24432646294A404E635166546A576E5A7234753778214125442A472D";
    public String extractEmail(String token){
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(String email){
        return generateToken(new HashMap<>(), email);
    }

    public String generateToken(
            Map<String, Object> extractClaims,
            String email
    ){
        return Jwts
                .builder()
                .setClaims(extractClaims)
                .setSubject(email)
                .setExpiration(new Date(System.currentTimeMillis() + 3600*1000))
                .signWith(SignatureAlgorithm.HS256, Keys.hmacShaKeyFor(Decoders.BASE64.decode(JWT_KEY)))
                .compact();
    }

    public boolean isTokenValid(String token, UserEntity user){
        String email = extractEmail(token);
        return user.getEmail().equals(email) && !isTokenExpired(token);
    }

    public boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token){
        return Jwts
                .parser()
                .setSigningKey(JWT_KEY)
                .parseClaimsJws(token)
                .getBody();
    }
}
