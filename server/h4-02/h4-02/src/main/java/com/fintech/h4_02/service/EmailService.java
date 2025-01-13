package com.fintech.h4_02.service;

import com.fintech.h4_02.exception.EmailServiceException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.UnsupportedEncodingException;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;

    @Value("${frontend.url}")
    private String frontendUrl;

    @Value("${backend.url}")
    private String backendUrl;

    @Value("${spring.mail.username}")
    private String emailSender;

    @Async
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
            String htmlContent = templateEngine.process("password-recovery", emailDetails.context());
            helper.setText(htmlContent, true);
            javaMailSender.send(message);
        } catch (MessagingException | UnsupportedEncodingException e) {
            throw new EmailServiceException("Failed to send email with subject: " + emailDetails.subject(), e);
        }
    }

    // TODO: Call repository to get user's name by email
    private String getUserNameByEmail(String email) {
        return email.split("@")[0];
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
