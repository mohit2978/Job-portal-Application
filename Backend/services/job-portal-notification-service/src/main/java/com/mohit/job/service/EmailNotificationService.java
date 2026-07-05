package com.mohit.job.service;

import com.mohit.job.dto.event.ApplicationNoteAddedEvent;
import com.mohit.job.dto.event.ApplicationStatusChangedEvent;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailNotificationService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendStatusChangeEmail(ApplicationStatusChangedEvent event) throws Exception {
        String subject = "Application Update: " + event.getJobTitle() + " at " + event.getCompanyName();
        String body = buildStatusChangeBody(event);
        sendEmail(event.getCandidateEmail(), subject, body);
        log.info("Status-change email sent to {}", event.getCandidateEmail());
    }

    public void sendNoteAddedEmail(ApplicationNoteAddedEvent event) throws Exception {
        String subject = "Activity on your application: " + event.getJobTitle() + " at " + event.getCompanyName();
        String body = buildNoteAddedBody(event);
        sendEmail(event.getCandidateEmail(), subject, body);
        log.info("Note-added email sent to {}", event.getCandidateEmail());
    }

    private String buildStatusChangeBody(ApplicationStatusChangedEvent event) {
        return "<div style='font-family: Arial, sans-serif; max-width: 600px;'>"
                + "<h2>Hello " + event.getCandidateName() + ",</h2>"
                + "<p>Your application status has been updated.</p>"
                + "<table style='border-collapse: collapse; width: 100%;'>"
                + "<tr><td style='padding: 8px; font-weight: bold;'>Job:</td>"
                + "<td style='padding: 8px;'>" + event.getJobTitle() + "</td></tr>"
                + "<tr><td style='padding: 8px; font-weight: bold;'>Company:</td>"
                + "<td style='padding: 8px;'>" + event.getCompanyName() + "</td></tr>"
                + "<tr><td style='padding: 8px; font-weight: bold;'>Previous Status:</td>"
                + "<td style='padding: 8px;'>" + (event.getOldStatus() != null ? event.getOldStatus() : "N/A") + "</td></tr>"
                + "<tr><td style='padding: 8px; font-weight: bold;'>New Status:</td>"
                + "<td style='padding: 8px; color: #2e7d32;'><strong>" + event.getNewStatus() + "</strong></td></tr>"
                + (event.getNote() != null && !event.getNote().isBlank()
                    ? "<tr><td style='padding: 8px; font-weight: bold;'>Note from employer:</td>"
                    + "<td style='padding: 8px;'>" + event.getNote() + "</td></tr>"
                    : "")
                + "</table>"
                + "<p>Log in to the portal to view your full application details.</p>"
                + "<p>Best regards,<br/>Job Portal Team</p>"
                + "</div>";
    }

    private String buildNoteAddedBody(ApplicationNoteAddedEvent event) {
        return "<div style='font-family: Arial, sans-serif; max-width: 600px;'>"
                + "<h2>Hello " + event.getCandidateName() + ",</h2>"
                + "<p>There has been new activity on your application.</p>"
                + "<table style='border-collapse: collapse; width: 100%;'>"
                + "<tr><td style='padding: 8px; font-weight: bold;'>Job:</td>"
                + "<td style='padding: 8px;'>" + event.getJobTitle() + "</td></tr>"
                + "<tr><td style='padding: 8px; font-weight: bold;'>Company:</td>"
                + "<td style='padding: 8px;'>" + event.getCompanyName() + "</td></tr>"
                + "</table>"
                + "<p>Log in to the portal to view your application details.</p>"
                + "<p>Best regards,<br/>Job Portal Team</p>"
                + "</div>";
    }

    private void sendEmail(String toEmail, String subject, String body) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
        helper.setFrom(fromEmail);
        helper.setTo(toEmail);
        helper.setSubject(subject);
        helper.setText(body, true);
        mailSender.send(mimeMessage);
    }
}
