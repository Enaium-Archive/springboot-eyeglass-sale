package com.example.server.config;

import com.example.server.bll.interceptor.request.CorsInterceptor;
import com.example.server.bll.interceptor.request.SaTokenInterceptor;
import lombok.AllArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@AllArgsConstructor
public class WebMvcConfig implements WebMvcConfigurer {

    private final CorsInterceptor corsInterceptor;
    private final SaTokenInterceptor saTokenInterceptor;

    @Override
    public void addInterceptors(@NotNull InterceptorRegistry registry) {
        registry.addInterceptor(corsInterceptor);
        registry.addInterceptor(saTokenInterceptor);
    }
}
