package com.askLink.backend.dto;

import lombok.*;

@Getter
@AllArgsConstructor
public class AuthResponse {

    private String email;
    private String token;

}
