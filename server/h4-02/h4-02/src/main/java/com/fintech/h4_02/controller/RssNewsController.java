package com.fintech.h4_02.controller;

import com.fintech.h4_02.dto.news.NewsItemDto;
import com.fintech.h4_02.service.RssNewsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/news")
@Tag(name = "Rss Feed News", description = "API for fetching RSS feed news")
@RequiredArgsConstructor
public class RssNewsController {
    private final RssNewsService rssNewsService;

    @Operation(summary = "Fetch news from RSS feeds", description = "Retrieve news from specified RSS feeds and process the data")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Successful retrieval of news",
                    content = @Content(
                            array = @ArraySchema(schema = @Schema(implementation = NewsItemDto.class))
                    )),
    })
    @GetMapping
    public ResponseEntity<List<NewsItemDto>> getNews() {
        List<NewsItemDto> news = rssNewsService.fetchNewsFromRss();
        return ResponseEntity.ok(news);
    }

}
