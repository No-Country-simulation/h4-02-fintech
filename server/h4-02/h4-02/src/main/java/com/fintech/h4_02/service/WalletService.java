package com.fintech.h4_02.service;

import com.fintech.h4_02.dto.wallet.WalletRequest;
import com.fintech.h4_02.dto.wallet.WalletResponse;
import com.fintech.h4_02.entity.UserEntity;
import com.fintech.h4_02.entity.WalletEntity;
import com.fintech.h4_02.enums.StateWallet;
import com.fintech.h4_02.exception.EntityNotFoundException;
import com.fintech.h4_02.repository.UserRepository;
import com.fintech.h4_02.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class WalletService {
    private final WalletRepository walletRepository;
    private final UserRepository userRepository;

    public WalletResponse createWallet(WalletRequest request) {
        UserEntity user = userRepository.findById(request.user())
                .orElseThrow(() -> new EntityNotFoundException("User with id: " + request.user() + " not found"));

        WalletEntity wallet = WalletEntity.builder()
                .user(user)
                .date(LocalDate.parse(request.date()))
                .value(new BigDecimal(request.value()))
                .state(StateWallet.valueOf(request.state().toUpperCase().trim()))
                .description(request.description())
                .build();
        wallet = walletRepository.save(wallet);

        return new WalletResponse(wallet);
    }

    @Transactional
    public WalletResponse updateWallet(Long walletId, WalletRequest request) {
        WalletEntity wallet = walletRepository.findById(walletId)
                .orElseThrow(() -> new EntityNotFoundException("Wallet with id: " + walletId + " not found"));

        wallet.setDescription(request.description());
        wallet.setValue(new BigDecimal(request.value()));
        wallet.setState(StateWallet.valueOf(request.state().toUpperCase().trim()));
        WalletEntity updatedWallet = walletRepository.save(wallet);

        return new WalletResponse(updatedWallet);
    }

}
