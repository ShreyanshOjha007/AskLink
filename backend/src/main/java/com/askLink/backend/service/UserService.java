package com.askLink.backend.service;

import com.askLink.backend.dto.UserRequest;
import com.askLink.backend.dto.UserResponse;
import com.askLink.backend.entity.UserEntity;
import com.askLink.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    public UserEntity registerUser(UserRequest userRequest) {
        Optional<UserEntity> existingUser = userRepository.findByEmail(userRequest.getEmail());

        if (existingUser.isPresent()) {
            throw new IllegalStateException("User already exists with email: " + userRequest.getEmail());
        }

        return userRepository.save(convertToEntity(userRequest));
    }

    private UserEntity convertToEntity(UserRequest userRequest){
        return UserEntity.builder()
                .userId(UUID.randomUUID().toString())
                .email(userRequest.getEmail())
                .password(passwordEncoder.encode(userRequest.getPassword()))
                .name(userRequest.getName())
                .build();
    }
}
