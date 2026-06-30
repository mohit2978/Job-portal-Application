package com.mohit.job.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailNotificationService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private  String fromEmail;

    public void sendStatusChnageEmail() throws Exception{
        SimpleMailMessage message = new SimpleMailMessage();

        try{
            String subject="Application update:";
            String body="<h1>your application has been updated</h1>";
            String toemail="akkikrjha@gmail.com";
            sendEmail(toemail,subject,body);
    }catch(Exception e){
        e.printStackTrace();
        throw new Exception(e.getMessage());}
    }

    private void sendEmail(String toemail, String subject, String body) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage,true,"UTF-8");
        helper.setFrom(fromEmail);
        helper.setTo(toemail);
        helper.setSubject(subject);
        helper.setText(body,true);
        mailSender.send(mimeMessage);
    }
}
