package com.fintech.h4_02.service;

import com.fintech.h4_02.dto.wallet.WalletRequest;
import com.fintech.h4_02.dto.wallet.WalletResponse;
import com.fintech.h4_02.entity.UserEntity;
import com.fintech.h4_02.entity.WalletEntity;
import com.fintech.h4_02.enums.StateWallet;
import com.fintech.h4_02.exception.EntityNotFoundException;
import com.fintech.h4_02.repository.UserRepository;
import com.fintech.h4_02.repository.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;

@Service
public class WalletService {

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private UserRepository userRepository;


    public WalletResponse create(WalletRequest walletRequest) {
        UserEntity user = userRepository.findById(walletRequest.user()).orElseThrow( ()-> new EntityNotFoundException("user not found"));

        WalletEntity wallet = WalletEntity.builder()
                .user(user)
                .date(new Date())
                .value(new BigDecimal(walletRequest.value()))
                .state(StateWallet.valueOf(walletRequest.state().toUpperCase().trim()))
                .description(walletRequest.description())
                .build();

        wallet = walletRepository.save(wallet);

        return new WalletResponse(wallet);
    }
}
