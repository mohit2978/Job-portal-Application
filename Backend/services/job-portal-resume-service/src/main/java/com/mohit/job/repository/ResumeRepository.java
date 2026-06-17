package com.mohit.job.repository;

import com.mohit.job.modal.Resume;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ResumeRepository extends JpaRepository<Resume, Long> {

    List<Resume> findByCandidateIdAndActiveTrue(Long candidateId);

    Optional<Resume> findByCandidateIdAndIsDefaultTrueAndActiveTrue(Long candidateId);

    boolean existsByCandidateIdAndActiveTrue(Long candidateId);

    int countByCandidateIdAndActiveTrue(Long candidateId);
}
