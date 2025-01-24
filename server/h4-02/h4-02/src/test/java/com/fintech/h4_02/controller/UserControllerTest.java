package com.fintech.h4_02.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fintech.h4_02.dto.auth.AuthResponseDto;
import com.fintech.h4_02.dto.auth.LoginRequestDto;
import com.fintech.h4_02.dto.onboarding.OnboardingRequest;
import com.fintech.h4_02.dto.user.CreateUserRequestDto;
import com.fintech.h4_02.dto.user.UserResponseDto;
import com.fintech.h4_02.dto.wallet.WalletRequest;
import com.fintech.h4_02.dto.wallet.WalletResponse;
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
                	"monthlyIncome": 30.06,
                	"monthlyExpenses": 352,
                	"savingsPercentage": 30.5,
                	"goals": ["bienes","retiro","proyecto"]
                }
                """;

        JsonUtil.toJsonPrint("json ", json);

        HttpEntity<String> request = new HttpEntity<>(json, headers);
        ResponseEntity<JsonNode> result = testRestTemplate.exchange("/api/v1/onboarding", HttpMethod.POST, request, JsonNode.class);
        JsonUtil.toJsonPrint("onboarding", result);
//UserResponseDto
        assertAll(
                () -> assertEquals(HttpStatus.CREATED, result.getStatusCode()),
                () -> assertEquals(201, result.getStatusCode().value())
               // () -> assertEquals(result.getBody().onboarding().getKnowledgeLevel().toString(), "PRINCIPIANTE"),
               // () -> assertEquals(result.getBody().onboarding().getRiskPreference().toString(), "MODERADO"),
               // () -> assertEquals(result.getBody().id(), 352),
               // () -> assertEquals(result.getBody().onboarding().getMonthlyIncome().toString(), "30.06"),
              //  () -> assertEquals(result.getBody().onboarding().getMonthlyExpenses().toString(), "352"),
               // () -> assertEquals(result.getBody().onboarding().getSavingsPercentage().toString(), "30.5")



        );
    }

    @Test
    @Label("obtener usuario por id")
    void getUserById() throws JsonProcessingException {


        HttpEntity<String> request = new HttpEntity<>( headers);
        ResponseEntity<JsonNode> result = testRestTemplate.exchange("/api/v1/user/352", HttpMethod.GET, request, JsonNode.class);
        JsonUtil.toJsonPrint("user created ", result);
//UserResponseDto
        assertAll(
                () -> assertEquals(HttpStatus.OK, result.getStatusCode()),
                () -> assertEquals(200, result.getStatusCode().value())
                //() -> assertEquals(result.getBody().id(),352)

        );
    }

    @Test
    @Label("ingresar dinero")
    void walletCreateIn() throws JsonProcessingException {

        WalletRequest wallet = new WalletRequest(1L, "Engreso de aginaldo", 150.000,"in","2024-01-21");
        String json = "{\"user\":\"" + wallet.user() + "\","
                + "\"description\":\"" + wallet.description() + "\","
                + "\"value\":\"" + wallet.value() + "\","
                + "\"date\":\"" + wallet.date() + "\","
                + "\"state\":\"" + wallet.state() + "\""
                + "}";


        JsonUtil.toJsonPrint("json ", json);

        HttpEntity<String> request = new HttpEntity<>(json, headers);
        ResponseEntity<JsonNode> result = testRestTemplate.exchange("/api/v1/wallet", HttpMethod.POST, request, JsonNode.class);
        JsonUtil.toJsonPrint("wallet created: ", result);
//WalletResponse
        assertAll(
                () -> assertEquals(HttpStatus.CREATED, result.getStatusCode()),
                () -> assertEquals(201, result.getStatusCode().value())
               // () -> assertEquals(result.getBody().user().getId(), wallet.user()),
              //  () -> assertEquals(result.getBody().description(), wallet.description()),
                //() -> assertNotNull(result.getBody().id())
        );
    }

    @Test
    @Label("egreso de  dinero")
    void walletCreateOut() throws JsonProcessingException {

        WalletRequest wallet = new WalletRequest(1L, "Factura de luz", 15.000,"out","2024-01-21");
        String json = "{\"user\":\"" + wallet.user() + "\","
                + "\"description\":\"" + wallet.description() + "\","
                + "\"value\":\"" + wallet.value() + "\","
                + "\"date\":\"" + wallet.date() + "\","
                + "\"state\":\"" + wallet.state() + "\""
                + "}";


        JsonUtil.toJsonPrint("json ", json);

        HttpEntity<String> request = new HttpEntity<>(json, headers);
        ResponseEntity<JsonNode> result = testRestTemplate.exchange("/api/v1/wallet", HttpMethod.POST, request, JsonNode.class);
        JsonUtil.toJsonPrint("wallet created: ", result);
//WalletResponse
        assertAll(
                () -> assertEquals(HttpStatus.CREATED, result.getStatusCode()),
                () -> assertEquals(201, result.getStatusCode().value())
              //  () -> assertEquals(result.getBody().user().getId(), wallet.user()),
               // () -> assertEquals(result.getBody().description(), wallet.description()),
               // () -> assertNotNull(result.getBody().id())
        );
    }



    @Test
    @Label("obtener lista de Fondos cotizado")
    void getAllExcange() throws JsonProcessingException {


        HttpEntity<String> request = new HttpEntity<>( headers);
        ResponseEntity<JsonNode> result = testRestTemplate.exchange("/api/v1/exchange/all/ETF", HttpMethod.GET, request, JsonNode.class);
        JsonUtil.toJsonPrint("user created ", result);

        assertAll(
                () -> assertEquals(HttpStatus.OK, result.getStatusCode()),
                () -> assertEquals(200, result.getStatusCode().value())


        );
    }

}