package com.fintech.h4_02.config;

import io.swagger.v3.oas.annotations.ExternalDocumentation;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;

@OpenAPIDefinition(
        info = @Info(
                title = "IUPI Fintech API documentation",
                version = "1.0",
                description = "IUPI Fintech API documentation v1.0",
                contact = @Contact(
                        name = "Lionel",
                        email = "staricofflionel@gmail.com",
                        url = "lionel.com"
                ),
                license = @License(
                        name = "Apache 2.0",
                        url = "http://www.apache.org/licenses/LICENSE-2.0.html"
                )
        ),
        externalDocs = @ExternalDocumentation(
                description = "GitHub repository",
                url = "https://github.com/No-Country-simulation/h4-02-fintech"
        )
)
public class OpenApiConfig {

}
