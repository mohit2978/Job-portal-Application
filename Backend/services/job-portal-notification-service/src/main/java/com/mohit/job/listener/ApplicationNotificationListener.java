package com.mohit.job.listener;

import com.mohit.job.dto.event.ApplicationNoteAddedEvent;
import com.mohit.job.dto.event.ApplicationStatusChangedEvent;
import com.mohit.job.service.EmailNotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class ApplicationNotificationListener {

    private final EmailNotificationService emailNotificationService;

    @KafkaListener(topics = "application.status.changed", groupId = "notification-service-group", containerFactory = "kafkaListenerContainerFactory")
    public void onStatusChanged(ApplicationStatusChangedEvent event) {
        log.info("Received status-changed event for application {}", event.getApplicationId());
        try {
            emailNotificationService.sendStatusChangeEmail(event);
        } catch (Exception e) {
            log.error("Failed to send status-change email for application {}", event.getApplicationId(), e);
        }
    }

    @KafkaListener(topics = "application.note.added", groupId = "notification-service-group", containerFactory = "kafkaListenerContainerFactory")
    public void onNoteAdded(ApplicationNoteAddedEvent event) {
        log.info("Received note-added event for application {}", event.getApplicationId());
        try {
            emailNotificationService.sendNoteAddedEmail(event);
        } catch (Exception e) {
            log.error("Failed to send note-added email for application {}", event.getApplicationId(), e);
        }
    }
}
