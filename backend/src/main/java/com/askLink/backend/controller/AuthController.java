package com.askLink.backend.controller;


import com.askLink.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @GetMapping("/callback")
    @ResponseStatus
    public ResponseEntity<?> callback(String token){
        System.out.println("chl rha h");
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
