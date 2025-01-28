package com.fintech.h4_02.dto.exchange;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

public record GetCoinByDatesRequest(
        @DateTimeFormat(pattern = "yyyy-MM-dd")
        @NotNull(message = "la fecha start no puede estar vacía")
        LocalDate start,
        @DateTimeFormat(pattern = "yyyy-MM-dd")
        @NotNull(message = "la fecha end no puede estar vacía")
        LocalDate  end,
        @NotBlank(message = "coin no puede estar vacío")
        String coin
) {
}
