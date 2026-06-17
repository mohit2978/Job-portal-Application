package com.mohit.job.repository;

import com.mohit.job.modal.Certification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CertificationRepository extends JpaRepository<Certification, Long> {

    List<Certification> findByResume_IdOrderByDisplayOrderAsc(Long resumeId);

    void deleteByResume_Id(Long resumeId);

}
