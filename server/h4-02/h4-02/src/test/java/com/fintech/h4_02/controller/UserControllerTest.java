package com.fintech.h4_02.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fintech.h4_02.dto.auth.AuthResponseDto;
import com.fintech.h4_02.dto.user.CreateUserRequestDto;
import com.fintech.h4_02.dto.user.UserResponseDto;
import com.fintech.h4_02.util.JsonUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserControllerTest {
    ObjectMapper objectMapper;
    private TestRestTemplate testRestTemplate;
    private HttpHeaders headers;
    @Autowired
    private RestTemplateBuilder restTemplateBuilder;
    @LocalServerPort
    private int port;

    @BeforeEach
    void setUp() {
        restTemplateBuilder = restTemplateBuilder.rootUri("http://localhost:" + port);
        testRestTemplate = new TestRestTemplate(restTemplateBuilder);
        headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        objectMapper = new ObjectMapper();
    }

    @Test
    void createUser() throws JsonProcessingException {
        CreateUserRequestDto user = new CreateUserRequestDto("lionel8@gmail", "12348", "Lionel8", "2588");
        String json = "{\"email\":\"" + user.email() + "\","
            + "\"password\":\"" + user.password() + "\","
            + "\"name\":\"" + user.name() + "\","
            + "\"dni\":\"" + user.dni() + "\""
            + "}";


        JsonUtil.toJsonPrint("json ", json);

        HttpEntity<String> request = new HttpEntity<>(json, headers);
        ResponseEntity<AuthResponseDto> result = testRestTemplate.exchange("/api/v1/auth/register", HttpMethod.POST, request, AuthResponseDto.class);
        JsonUtil.toJsonPrint("user created ", result);

        assertAll(
            () -> assertEquals(HttpStatus.CREATED, result.getStatusCode()),
            () -> assertEquals(201, result.getStatusCode().value()),
            () -> assertEquals(result.getBody().user().email(), user.email()),
            () -> assertEquals(result.getBody().user().name(), user.name()),
            () -> assertNotNull(result.getBody().user().id())
        );
    }
}