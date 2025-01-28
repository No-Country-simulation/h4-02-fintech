package com.fintech.h4_02.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fintech.h4_02.dto.recommendation.RecommendationRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecommendationService {
    private final RestTemplate restTemplate;
    private final ObjectMapper mapper;

    @Value("${ml.recommended-assets.url}")
    private String recommendedAssetsUrl;

    public List<String> getRecommendations(RecommendationRequestDto dto) {
        try {
            String jsonResponse = restTemplate.postForObject(recommendedAssetsUrl, dto, String.class);
            JsonNode rootNode = mapper.readTree(jsonResponse);
            JsonNode dataNode = rootNode.get("recommended_assets");
            return mapper.readValue(dataNode.toString(), new TypeReference<>() {
            });
        } catch (Exception e) {
            e.printStackTrace();
            return List.of();
        }
    }

}
