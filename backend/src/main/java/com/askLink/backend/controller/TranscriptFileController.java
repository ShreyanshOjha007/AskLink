package com.askLink.backend.controller;

import com.askLink.backend.entity.TranscriptFile;
import com.askLink.backend.service.TranscriptFileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/file")
public class TranscriptFileController {

    private final TranscriptFileService transcriptFileService;

    @GetMapping("/getUserFiles")
    public List<TranscriptFile> getUserFiles(@AuthenticationPrincipal UserDetails userDetails){
        String userEmail = userDetails.getUsername();
        return transcriptFileService.getUserFiles(userEmail);
    }

    @PostMapping("/deleteFile/{fileId}")
    public ResponseEntity<?> deleteUserFile(@PathVariable Long fileId, @AuthenticationPrincipal UserDetails userDetails){
        try{
            String userEmail  = userDetails.getUsername();
            transcriptFileService.deleteUserFile(fileId, userEmail);
            return ResponseEntity.status(HttpStatus.OK).build();
        }catch (RuntimeException e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
