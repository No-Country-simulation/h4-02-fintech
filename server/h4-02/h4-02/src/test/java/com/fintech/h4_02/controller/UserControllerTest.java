package com.fintech.h4_02.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fintech.h4_02.dto.User.UserCreated;
import com.fintech.h4_02.dto.User.UsercreatedResponse;
import com.fintech.h4_02.repository.UserRepository;
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
    private TestRestTemplate testRestTemplate;

    private HttpHeaders headers;

    @Autowired
    private RestTemplateBuilder restTemplateBuilder;

    @LocalServerPort
    private int port;

    ObjectMapper objectMapper;

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
        UserCreated user = new UserCreated("lionel@gmail", "1234", "Lionel", "258698741");

        String json = "{\"email\":\"" + user.email() + "\","
                + "\"password\":\"" + user.password() + "\","
                + "\"name\":\"" + user.name() + "\","
                + "\"dni\":\"" + user.dni() + "\""
                + "}";


        JsonUtil.toJsonPrint("json ", json);


        HttpEntity<String> request = new HttpEntity<>(json, headers);
        ResponseEntity<UsercreatedResponse> result = testRestTemplate.exchange("/api/v1/user", HttpMethod.POST, request, UsercreatedResponse.class);
        JsonUtil.toJsonPrint("user created ", result);

        assertAll(
                () -> assertEquals(HttpStatus.CREATED, result.getStatusCode()),
                () -> assertEquals(201, result.getStatusCode().value()),
                () -> assertEquals(result.getBody().email(), user.email()),
                () -> assertEquals(result.getBody().name(), user.name()),
                () -> assertNotNull(result.getBody().id())
        );
    }
}