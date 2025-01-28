package com.fintech.h4_02.dto.wallet;

import com.fintech.h4_02.dto.user.UserResponseDto;
import com.fintech.h4_02.entity.WalletEntity;
import com.fintech.h4_02.enums.StateWallet;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record WalletResponse(
        @NotNull
        Long id,

        UserResponseDto user,

        String description,

        BigDecimal value,

        StateWallet state,

        String date
) {

    public WalletResponse(WalletEntity wallet) {
        this(
                wallet.getId(),
                new UserResponseDto(wallet.getUser()),
                wallet.getDescription(),
                wallet.getValue(),
                wallet.getState(),
                wallet.getDate().toString()
        );
    }

}
