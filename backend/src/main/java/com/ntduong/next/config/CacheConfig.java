//package com.ntduong.next.config;
//
//import org.springframework.cache.annotation.CachingConfigurerSupport;
//import org.springframework.cache.annotation.EnableCaching;
//import org.springframework.cache.interceptor.KeyGenerator;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//@EnableCaching
//public class CacheConfig extends CachingConfigurerSupport {
//
//    @Bean
//    public KeyGenerator customKeyGenerator() {
//        return (target, method, params) -> {
//            // Generate a custom cache key based on the method and its parameters.
//            StringBuilder key = new StringBuilder();
//            key.append(target.getClass().getName());
//            key.append(method.getName());
//            for (Object param : params) {
//                key.append(param.toString());
//            }
//            return key.toString();
//        };
//    }
//}
//
