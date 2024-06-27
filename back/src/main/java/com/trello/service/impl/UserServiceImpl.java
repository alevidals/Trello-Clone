package com.trello.service.impl;

import com.trello.dto.ChangePasswordDto;
import com.trello.exception.BadRequestException;
import com.trello.exception.UserNotFoundException;
import com.trello.model.User;
import com.trello.repository.UserRepository;
import com.trello.service.UserService;
import com.trello.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository
                .findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email " + email));
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    @Override
    public void changePassword(ChangePasswordDto changePasswordDto, Principal connectedUser) {
        User currentUser = SecurityUtils.getCurrentUser(connectedUser);

        if (!passwordEncoder.matches(changePasswordDto.getCurrentPassword(), currentUser.getPassword())) {
            throw new BadRequestException("The current password do not match with the current one");
        }

        if (!changePasswordDto.getNewPassword().equals(changePasswordDto.getConfirmationPassword())) {
            throw new BadRequestException("The password and confirmation password are not the same");
        }

        currentUser.setPassword(passwordEncoder.encode(changePasswordDto.getNewPassword()));
        userRepository.save(currentUser);
    }
}
