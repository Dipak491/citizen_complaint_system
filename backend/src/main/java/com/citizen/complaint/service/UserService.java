package com.citizen.complaint.service;

import com.citizen.complaint.dto.RegisterRequest;
import com.citizen.complaint.entity.Role;
import com.citizen.complaint.entity.User;
import com.citizen.complaint.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User register(RegisterRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        System.out.println("Role received: " + request.getRole());

        try {
            Role role = Role.valueOf(request.getRole().trim().toUpperCase());
            user.setRole(role);
        } catch (Exception e) {
            user.setRole(Role.CITIZEN);
        }

        return userRepository.save(user);
    }
}
