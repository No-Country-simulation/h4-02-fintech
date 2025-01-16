package com.fintech.h4_02.controller;

import com.fintech.h4_02.dto.auth.AuthResponseDto;
import com.fintech.h4_02.dto.auth.LoginRequestDto;
import com.fintech.h4_02.dto.user.CreateUserRequestDto;
import com.fintech.h4_02.dto.user.UserResponseDto;
import com.fintech.h4_02.service.mail.EmailService;
import com.fintech.h4_02.util.JsonUtil;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;

@ActiveProfiles("test")
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserControllerTest {
    @Autowired private RestTemplateBuilder restTemplateBuilder;
    private TestRestTemplate testRestTemplate;
    private HttpHeaders headers;
    @MockitoBean private EmailService emailService;
    @LocalServerPort private int port;
    private AutoCloseable autoCloseable;

    @BeforeEach
    void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);
        restTemplateBuilder = restTemplateBuilder.rootUri("http://localhost:" + port);
        testRestTemplate = new TestRestTemplate(restTemplateBuilder);
        headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
    }

    @Test
    @DisplayName("Login")
    void login() {
        CreateUserRequestDto lionel = new CreateUserRequestDto("liontestlogin@gmail.com", "Password123@", "Lionel", "12345678");
        doRegister(lionel);

        LoginRequestDto user = new LoginRequestDto(lionel.email(), lionel.password());
        String json = JsonUtil.toJsonString(user);

        HttpEntity<String> request = new HttpEntity<>(json, headers);
        ResponseEntity<AuthResponseDto> result = testRestTemplate.exchange("/api/v1/auth/login", HttpMethod.POST, request, AuthResponseDto.class);
        JsonUtil.toJsonPrint("User logged ", result);

        assertAll(
                () -> assertEquals(HttpStatus.OK, result.getStatusCode()),
                () -> assertEquals(200, result.getStatusCode().value()),
                () -> assertNotNull(result.getBody().user().id()),
                () -> assertNotNull(result.getBody().token())
        );
    }

    @Test
    @DisplayName("Crear usuarios con seguridad")
    void createUser() {
        String response = UUID.randomUUID().toString();
        CreateUserRequestDto user = new CreateUserRequestDto(response + "@gmail.com", response, "Lionel" + response, response);
        String json = JsonUtil.toJsonString(user);
        JsonUtil.toJsonPrint("json ", json);

        HttpEntity<String> request = new HttpEntity<>(json, headers);
        ResponseEntity<AuthResponseDto> result = testRestTemplate.exchange("/api/v1/auth/register", HttpMethod.POST, request, AuthResponseDto.class);
        JsonUtil.toJsonPrint("User created ", result);

        assertAll(
                () -> assertEquals(HttpStatus.CREATED, result.getStatusCode()),
                () -> assertEquals(201, result.getStatusCode().value()),
                () -> assertEquals(result.getBody().user().email(), user.email()),
                () -> assertEquals(result.getBody().user().name(), user.name()),
                () -> assertNotNull(result.getBody().user().id())
        );
        verify(emailService, Mockito.times(1)).sendAccountConfirmationEmail(eq(user.email()), anyString());
    }

    @Test
    @DisplayName("Crear onboarding perfil financiero del usuario")
    void createOnboarding() {
        CreateUserRequestDto lionel = new CreateUserRequestDto("liontestlogin@gmail.com", "Password123@", "Lionel", "12345678");
        Long userId = doRegister(lionel);
        // const formData = {
        //    knowledgeLevel: string,        // "principiante" | "intermedio" | "avanzado"
        //    goals: string[],               // ["vacaciones", "bienes", "retiro", "proyecto"]
        //    riskPreference: string,        // "bajo" | "moderado" | "alto"
        //    monthlyIncome: number,         // Número positivo
        //    monthlyExpenses: number,       // Número positivo
        //    savingsPercentage: number,     // Número positivo
        // };
        String json = """
                {
                	"userId": %s,
                	"knowledgeLevel": "principiante",
                	"riskPreference": "moderado",
                	"monthlyIncome": 30.06,
                	"monthlyExpenses": 352,
                	"savingsPercentage": 30.5,
                	"goals": ["bienes","retiro","proyecto"]
                }
                """.formatted(userId);

        JsonUtil.toJsonPrint("json ", json);

        HttpEntity<String> request = new HttpEntity<>(json, headers);
        ResponseEntity<UserResponseDto> result = testRestTemplate.exchange("/api/v1/onboarding", HttpMethod.POST, request, UserResponseDto.class);

        JsonUtil.toJsonPrint("onboarding", result);

        assertAll(
                () -> assertEquals(HttpStatus.CREATED, result.getStatusCode()),
                () -> assertEquals(userId, result.getBody().id()),
                () -> assertEquals("PRINCIPIANTE", result.getBody().onboarding().getKnowledgeLevel().toString()),
                () -> assertEquals("MODERADO", result.getBody().onboarding().getRiskPreference().toString()),
                () -> assertEquals("30.06", result.getBody().onboarding().getMonthlyIncome().toString()),
                () -> assertEquals("352", result.getBody().onboarding().getMonthlyExpenses().toString()),
                () -> assertEquals("30.5", result.getBody().onboarding().getSavingsPercentage().toString())
        );
    }

    @Test
    @DisplayName("Get user by id")
    void getUserById() {
        CreateUserRequestDto lionel = new CreateUserRequestDto("liontestlogin@gmail.com", "Password123@", "Lionel", "12345678");
        Long userId = doRegister(lionel);

        HttpEntity<String> request = new HttpEntity<>(headers);
        ResponseEntity<UserResponseDto> result = testRestTemplate.exchange("/api/v1/user/" + userId, HttpMethod.GET, request, UserResponseDto.class);
        JsonUtil.toJsonPrint("user created ", result);

        assertAll(
                () -> assertEquals(HttpStatus.OK, result.getStatusCode()),
                () -> assertEquals(userId, result.getBody().id())
        );
    }

    private Long doRegister(CreateUserRequestDto user) {
        String json = JsonUtil.toJsonString(user);
        HttpEntity<String> request = new HttpEntity<>(json, headers);

        ResponseEntity<AuthResponseDto> result = testRestTemplate.exchange("/api/v1/auth/register", HttpMethod.POST, request, AuthResponseDto.class);

        String jwt = result.getBody().token();
        headers.set(HttpHeaders.AUTHORIZATION, "Bearer " + jwt);
        JsonUtil.toJsonPrint("User created ", result);
        return result.getBody().user().id();
    }

}