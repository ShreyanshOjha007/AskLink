package com.askLink.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true,nullable = false)
    private String kindeId;

    @Column(nullable = false)
    private String email;

    private String name;

    private LocalDateTime createdAt = LocalDateTime.now();

}
