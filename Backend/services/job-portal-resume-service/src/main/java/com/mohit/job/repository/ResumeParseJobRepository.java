package com.mohit.job.repository;

import com.mohit.job.domain.ParseStatus;
import com.mohit.job.modal.ResumeParseJob;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResumeParseJobRepository extends JpaRepository<ResumeParseJob, Long> {

    List<ResumeParseJob> findByCandidateIdOrderByCreatedAtDesc(Long candidateId);

    List<ResumeParseJob> findByStatus(ParseStatus status);
}
