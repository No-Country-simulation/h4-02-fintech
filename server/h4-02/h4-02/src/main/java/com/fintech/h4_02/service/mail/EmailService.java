package com.fintech.h4_02.service.mail;

import org.springframework.scheduling.annotation.Async;

public interface EmailService {

    @Async
    void sendPasswordRecoveryEmail(String toEmail, String resetPasswordLink);

    @Async
    void sendAccountConfirmationEmail(String toEmail, String token);

}
