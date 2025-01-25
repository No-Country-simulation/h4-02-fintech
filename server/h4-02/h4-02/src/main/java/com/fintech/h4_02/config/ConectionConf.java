package com.fintech.h4_02.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class ConectionConf {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
