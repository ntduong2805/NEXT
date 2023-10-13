package com.ntduong.next.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000", "http://127.0.0.1:5173/") // Cho phép truy cập từ máy chủ gốc này
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Cho phép các phương thức này
                .allowedHeaders("*") // Cho phép tất cả các tiêu đề
                .exposedHeaders("header1", "header2") // Các tiêu đề được phép hiển thị
                .allowCredentials(true) // Cho phép sử dụng cookie khi gửi yêu cầu
                .maxAge(3600); // Thời gian sống của CORS preflight request
    }
}
