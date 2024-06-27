package com.trello.service;

import com.trello.dto.ChangePasswordDto;
import com.trello.model.User;

import java.security.Principal;

public interface UserService {

    User save(User user);

    User findByEmail(String email);

    boolean existsByEmail(String email);

    void changePassword(ChangePasswordDto changePasswordDto, Principal connectedUser);

}
