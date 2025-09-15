package com.askLink.backend.controller;


import com.askLink.backend.dto.UserResponse;
import com.askLink.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.parameters.P;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/callback")
    public ResponseEntity<?> callback(@AuthenticationPrincipal Jwt jwt){
        if(jwt == null) return ResponseEntity.status(401).body("Unauthorized");

        String kindeId = jwt.getSubject();
        String email = jwt.getClaimAsString("email");
        String name = jwt.getClaimAsString("name");

        if(kindeId == null || email == null) return ResponseEntity.status(400).body("invalid token");

        UserResponse userResponse = userService.saveOrGetUser(kindeId,email,name);

        return ResponseEntity.ok(userResponse);
    }
}
