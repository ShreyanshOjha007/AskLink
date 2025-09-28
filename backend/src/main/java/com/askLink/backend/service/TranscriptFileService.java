package com.askLink.backend.service;

import com.askLink.backend.entity.TranscriptFile;
import com.askLink.backend.repository.TranscriptFileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class TranscriptFileService {

    private final TranscriptFileRepository transcriptFileRepository;

    public List<TranscriptFile> getUserFiles(String userEmail) {
        return transcriptFileRepository.findByEmailOrderByCreatedAtDesc(userEmail);
    }

    public void deleteUserFile(Long fileId, String userEmail) {

        TranscriptFile existingFile = transcriptFileRepository.findByIdAndEmail(fileId, userEmail)
                .orElseThrow(() -> new RuntimeException("File not found or not owned by user"));
        transcriptFileRepository.deleteByIdAndEmail(fileId, userEmail);
    }



}
