package com.fintech.h4_02.service;

import com.fintech.h4_02.dto.news.NewsItemDto;
import com.fintech.h4_02.dto.news.NewsRssResponseDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class RssNewsService {
    private final RestTemplate restTemplate;

    @Value("${rss_feed.urls}")
    private String[] rssUrls;

    public RssNewsService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    public List<NewsItemDto> fetchNewsFromRss() {
        return Arrays.stream(rssUrls)
                .flatMap(url -> fetchNewsFromRss(url).stream())
                .toList();
    }

    private List<NewsItemDto> fetchNewsFromRss(String rssUrl) {
        // Fetch RSS feed as JSON
        var response = restTemplate.exchange(rssUrl, HttpMethod.GET, null, NewsRssResponseDto.class);
        if (response.getBody() == null) {
            return List.of();
        }
        // Extract items from JSON response
        return response.getBody().items();
    }

}
