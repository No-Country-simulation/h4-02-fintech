package com.fintech.h4_02.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fintech.h4_02.dto.auth.AuthResponseDto;
import com.fintech.h4_02.dto.auth.LoginRequestDto;
import com.fintech.h4_02.dto.onboarding.OnboardingRequest;
import com.fintech.h4_02.dto.user.CreateUserRequestDto;
import com.fintech.h4_02.dto.user.UserResponseDto;
import com.fintech.h4_02.entity.OnboardingEntity;
import com.fintech.h4_02.entity.UserEntity;
import com.fintech.h4_02.util.JsonUtil;
import jdk.jfr.Label;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;

import java.util.*;

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

    private String jwt;

    @BeforeEach
    void setUp() {
        restTemplateBuilder = restTemplateBuilder.rootUri("http://localhost:" + port);
        testRestTemplate = new TestRestTemplate(restTemplateBuilder);
        headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        LoginRequestDto user = new LoginRequestDto("liontestlogin@gmail", "liontestlogin@gmail");
        String json = "{\"email\":\"" + user.email() + "\","
                + "\"password\":\"" + user.password() + "\""
                + "}";


        HttpEntity<String> request = new HttpEntity<>(json, headers);
        ResponseEntity<AuthResponseDto> result = testRestTemplate.exchange("/api/v1/auth/login", HttpMethod.POST, request, AuthResponseDto.class);
        jwt = result.getBody().token();
        headers.set(HttpHeaders.AUTHORIZATION, "Bearer " + jwt);
        System.out.println("headers = " + headers);
    }

    @Test
    @Label("crear ususarios con seguridad")
    void createUser() throws JsonProcessingException {
        String reaspuesta = UUID.randomUUID().toString();
        CreateUserRequestDto user = new CreateUserRequestDto(reaspuesta + "@gmail", reaspuesta, "Lione" + reaspuesta, reaspuesta);
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


    @Test
    @Label("login")
    void login() throws JsonProcessingException {

        LoginRequestDto user = new LoginRequestDto("liontestlogin@gmail", "liontestlogin@gmail");
        String json = "{\"email\":\"" + user.email() + "\","
                + "\"password\":\"" + user.password() + "\""
                + "}";

        HttpEntity<String> request = new HttpEntity<>(json, headers);
        ResponseEntity<AuthResponseDto> result = testRestTemplate.exchange("/api/v1/auth/login", HttpMethod.POST, request, AuthResponseDto.class);
        JsonUtil.toJsonPrint("user created ", result);

        assertAll(
                () -> assertEquals(HttpStatus.OK, result.getStatusCode()),
                () -> assertEquals(200, result.getStatusCode().value()),
                () -> assertNotNull(result.getBody().user().id()),
                () -> assertNotNull(result.getBody().token())
        );
    }


    @Test
    @Label("crear onboarding perfil financiero del usuario")
    void createonboarding() throws JsonProcessingException {
/*
* const formData = {
  knowledgeLevel: string,        // "principiante" | "intermedio" | "avanzado"
  goals: string[],               // ["vacaciones", "bienes", "retiro", "proyecto"]
  riskPreference: string,        // "bajo" | "moderado" | "alto"
  monthlyIncome: number,         // Número positivo
  monthlyExpenses: number,       // Número positivo
  savingsPercentage: number,     // Número positivo
};
* */


String json = """
        {
        	"userId": 352,
        	"knowledgeLevel": "principiante",
        	"riskPreference": "moderado",
        	"monthlyIncome": "30.06",
        	"monthlyExpenses": "352",
        	"savingsPercentage": "30.5",
        	"goals": ["bienes","retiro","vacaciones"]
        }
        """;

        JsonUtil.toJsonPrint("json ", json);

        HttpEntity<String> request = new HttpEntity<>(json, headers);
        ResponseEntity<JsonNode> result = testRestTemplate.exchange("/api/v1/onboarding", HttpMethod.POST, request, JsonNode.class);
        JsonUtil.toJsonPrint("onboarding", result);

        assertAll(
                () -> assertEquals(HttpStatus.CREATED, result.getStatusCode()),
                () -> assertEquals(201, result.getStatusCode().value())


        );
    }


}