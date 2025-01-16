package com.fintech.h4_02.service.mail;

import com.fintech.h4_02.entity.UserEntity;
import com.fintech.h4_02.exception.EmailServiceException;
import com.fintech.h4_02.exception.EntityNotFoundException;
import com.fintech.h4_02.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.UnsupportedEncodingException;

@Service
@Primary
@RequiredArgsConstructor
public class DefaultEmailService implements EmailService {
    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;
    private final UserService userService;

    @Value("${backend.url}")
    private String backendUrl;

    @Value("${spring.mail.username}")
    private String emailSender;

    @Async
    @Override
    public void sendPasswordRecoveryEmail(String toEmail, String resetPasswordLink) {
        String username = getUserNameByEmail(toEmail);
        Context context = new Context();
        context.setVariable("resetPasswordLink", resetPasswordLink);
        context.setVariable("username", username);
        EmailDetails emailDetails = EmailDetails.builder()
                .toEmail(toEmail)
                .senderPersonal("Support")
                .subject("Password Recovery Request")
                .template("password-recovery")
                .context(context)
                .build();
        sendEmail(emailDetails);
    }

    @Async
    @Override
    public void sendAccountConfirmationEmail(String toEmail, String token) {
        String username = getUserNameByEmail(toEmail);
        String activationLink = String.format("%s/api/v1/activation/confirm-account?token=%s", backendUrl, token);
        Context context = new Context();
        context.setVariable("username", username);
        context.setVariable("confirmationLink", activationLink);
        EmailDetails emailDetails = EmailDetails.builder()
                .toEmail(toEmail)
                .senderPersonal("Support")
                .subject("Account Activation Request")
                .template("account-confirmation")
                .context(context)
                .build();
        sendEmail(emailDetails);
    }

    private void sendEmail(EmailDetails emailDetails) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(emailSender, emailDetails.senderPersonal());
            helper.setTo(emailDetails.toEmail());
            helper.setSubject(emailDetails.subject());
            String htmlContent = templateEngine.process(emailDetails.template(), emailDetails.context());
            helper.setText(htmlContent, true);
            javaMailSender.send(message);
        } catch (MessagingException | UnsupportedEncodingException e) {
            throw new EmailServiceException("Failed to send email with subject: " + emailDetails.subject(), e);
        }
    }

    private String getUserNameByEmail(String email) {
        try {
            UserEntity userEntity = userService.getUserByEmail(email);
            return userEntity.getName();
        } catch (EntityNotFoundException e) {
            return "Usuario";
        }
    }

    @Builder
    private record EmailDetails(
            String toEmail,
            String senderPersonal,
            String subject,
            String template,
            Context context
    ) {

    }


}
