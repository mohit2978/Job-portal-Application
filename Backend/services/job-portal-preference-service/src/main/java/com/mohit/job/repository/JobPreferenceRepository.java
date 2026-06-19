package com.mohit.job.repository;

import com.mohit.job.entity.JobPreference;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JobPreferenceRepository extends JpaRepository<JobPreference, Long> {
    Optional<JobPreference> findByCandidateId(Long candidateId);
    boolean existsByCandidateId(Long candidateId);
}
