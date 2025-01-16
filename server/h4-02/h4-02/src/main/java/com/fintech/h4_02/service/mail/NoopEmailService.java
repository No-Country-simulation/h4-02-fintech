package com.fintech.h4_02.service.mail;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service
@Profile("noop-email")
public class NoopEmailService implements EmailService {

    @Override
    public void sendPasswordRecoveryEmail(String toEmail, String resetPasswordLink) {
        
    }

    @Override
    public void sendAccountConfirmationEmail(String toEmail, String token) {

    }

}
