package com.fintech.h4_02.dto.wallet;

import com.fintech.h4_02.entity.UserEntity;
import com.fintech.h4_02.entity.WalletEntity;
import com.fintech.h4_02.enums.StateWallet;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

public record WalletResponse(
        @NotNull
        Long id,
        UserEntity user,
        String description,

        BigDecimal value,

        StateWallet state,
        String date
) {
    public WalletResponse(WalletEntity wallet) {
        this(wallet.getId(), wallet.getUser(), wallet.getDescription(), wallet.getValue(),wallet.getState(),wallet.getDate().toString());
    }
}
