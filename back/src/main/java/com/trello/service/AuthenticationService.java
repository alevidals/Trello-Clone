package com.trello.service;

import com.trello.dto.AuthenticationDto;
import com.trello.dto.LoginDto;
import com.trello.dto.RegisterDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public interface AuthenticationService {

    AuthenticationDto register(RegisterDto registerDto);

    AuthenticationDto login(LoginDto loginDto);

    AuthenticationDto refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException;

    void validateToken(HttpServletRequest request);
}
