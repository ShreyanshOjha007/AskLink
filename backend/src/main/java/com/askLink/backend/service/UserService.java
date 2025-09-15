package com.askLink.backend.service;

import com.askLink.backend.dto.UserResponse;
import com.askLink.backend.entity.User;
import com.askLink.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;


    public UserResponse saveOrGetUser(String kindId, String email, String name) {
        User existingUser = userRepository.findByKindeId(kindId)
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setKindeId(kindId);
                    newUser.setName(name);
                    newUser.setEmail(email);
                    return userRepository.save(newUser);
                });
        return convertToResponse(existingUser);
    }

    public UserResponse convertToResponse(User user){
        return UserResponse.builder()
                .kindeId(user.getKindeId())
                .email(user.getEmail())
                .name(user.getName()).build();
    }
}
