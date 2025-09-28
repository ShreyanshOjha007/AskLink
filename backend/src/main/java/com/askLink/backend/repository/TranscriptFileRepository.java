package com.askLink.backend.repository;

import com.askLink.backend.entity.TranscriptFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TranscriptFileRepository extends JpaRepository<TranscriptFile,Long> {

    List<TranscriptFile> findByEmailOrderByCreatedAtDesc(String email);

    Optional<TranscriptFile> findByIdAndEmail(Long id, String email);

    void deleteByIdAndEmail(Long id, String email);

}
