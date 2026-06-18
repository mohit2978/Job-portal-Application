package com.mohit.job.service.impl;

import com.mohit.job.dto.request.AddApplicationNoteRequest;
import com.mohit.job.dto.response.ApplicationNoteResponse;
import com.mohit.job.mapper.ApplicationMapper;
import com.mohit.job.modal.ApplicationNote;
import com.mohit.job.modal.JobApplication;
import com.mohit.job.repository.ApplicationNoteRepository;
import com.mohit.job.service.ApplicationNoteService;
import com.mohit.job.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApplicationNoteServiceImpl implements ApplicationNoteService {

    private final ApplicationNoteRepository noteRepository;
    private final ApplicationService applicationService;

    @Override
    public ApplicationNoteResponse addNote(Long applicationId, Long employerId, AddApplicationNoteRequest req) throws Exception {
        JobApplication application = applicationService.getApplicationEntity(applicationId);
        assertEmployer(application, employerId);

        ApplicationNote note = ApplicationNote.builder()
                .application(application)
                .addedByUserId(employerId)
                .content(req.getContent())
                .build();

        return ApplicationMapper.toNoteResponse(noteRepository.save(note));
    }

    @Override
    public List<ApplicationNoteResponse> getNotesByApplication(Long applicationId, Long employerId) throws Exception {
        JobApplication application = applicationService.getApplicationEntity(applicationId);
        assertEmployer(application, employerId);

        return noteRepository.findByApplicationIdOrderByCreatedAtDesc(applicationId)
                .stream().map(ApplicationMapper::toNoteResponse).collect(Collectors.toList());
    }

    @Override
    public void deleteNote(Long noteId, Long applicationId, Long employerId) throws Exception {
        JobApplication application = applicationService.getApplicationEntity(applicationId);
        assertEmployer(application, employerId);

        ApplicationNote note = noteRepository.findById(noteId)
                .orElseThrow(() -> new Exception("Note not found with id: " + noteId));

        if (!note.getApplication().getId().equals(applicationId)) {
            throw new Exception("Note does not belong to application with id: " + applicationId);
        }

        noteRepository.delete(note);
    }

    private void assertEmployer(JobApplication application, Long employerId) throws Exception {
        if (!application.getEmployerId().equals(employerId)) {
            throw new Exception("You are not the employer for this application");
        }
    }
}
