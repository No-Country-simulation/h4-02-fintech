package com.fintech.h4_02.dto.news;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewsItemDto {
    private String guid;

    private String url;

    private String title;

    private String summary;

    @JsonProperty("date_published")
    private String datePublished;
}
