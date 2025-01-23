package com.fintech.h4_02.dto.news;

import java.util.List;

public record NewsRssResponseDto(
        String title,

        String description,

        List<NewsItemDto> items
) {

}
