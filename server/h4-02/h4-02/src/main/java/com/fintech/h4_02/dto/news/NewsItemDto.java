package com.fintech.h4_02.dto.news;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class NewsItemDto {
    private String guid;

    private String link;

    private String title;

    private String content;

    private String pubDate;

    private List<String> categories;
}
