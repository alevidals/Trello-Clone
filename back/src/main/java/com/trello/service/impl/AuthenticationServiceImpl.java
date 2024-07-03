package com.trello.service.impl;

import com.trello.dto.AuthenticationDto;
import com.trello.dto.LoginDto;
import com.trello.dto.RegisterDto;
import com.trello.exception.BadRequestException;
import com.trello.exception.ItemExistsException;
import com.trello.exception.RequiredHeaderNotFoundException;
import com.trello.exception.TokenNotValidException;
import com.trello.model.Role;
import com.trello.model.Token;
import com.trello.model.User;
import com.trello.repository.TokenRepository;
import com.trello.service.AuthenticationService;
import com.trello.service.JwtService;
import com.trello.service.TokenService;
import com.trello.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserService userService;
    private final TokenService tokenService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenRepository tokenRepository;

    @Override
    public AuthenticationDto register(RegisterDto registerDto) {
        if (userService.existsByEmail(registerDto.getEmail())) {
            throw new ItemExistsException("The email already exists");
        }

        User user = User.builder()
                .email(registerDto.getEmail())
                .password(passwordEncoder.encode(registerDto.getPassword()))
                .role(Role.USER)
                .build();

        User savedUser = userService.save(user);
        String jwtToken = jwtService.generateToken(savedUser);
        String refreshToken = jwtService.generateRefreshToken(savedUser);

        saveUserToken(jwtToken, savedUser);

        return AuthenticationDto.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Override
    public AuthenticationDto login(LoginDto loginDto) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDto.getEmail(),
                            loginDto.getPassword()
                    )
            );
        } catch (AuthenticationException ex) {
            if (ex instanceof BadCredentialsException) {
                throw new BadRequestException("Wrong email or password");
            }
        }

        User user = userService.findByEmail(loginDto.getEmail());
        String jwtToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        tokenService.revokeAllUserTokens(user.getId());
        saveUserToken(jwtToken, user);

        return AuthenticationDto.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Override
    public AuthenticationDto refreshToken(HttpServletRequest request, HttpServletResponse response) {
        final String authenticationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authenticationHeader == null || !authenticationHeader.startsWith("Bearer ")) {
            throw new RequiredHeaderNotFoundException("The authorization header or Bearer prefix is not present");
        }

        final String refreshToken = authenticationHeader.substring(7);
        final String userEmail = jwtService.extractUsername(refreshToken);

        if (userEmail == null) {
            throw new TokenNotValidException("The token provided is not valid");
        }

        User user = userService.findByEmail(userEmail);

        if (!jwtService.isTokenValid(refreshToken, user)) {
            throw new TokenNotValidException("The token provided is not valid");
        }

        String accessToken = jwtService.generateToken(user);
        tokenService.revokeAllUserTokens(user.getId());
        saveUserToken(accessToken, user);

        return AuthenticationDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Override
    public void validateToken(HttpServletRequest request) {
        final String authenticationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authenticationHeader == null || !authenticationHeader.startsWith("Bearer ")) {
            throw new RequiredHeaderNotFoundException("The authorization header or Bearer prefix is not present");
        }

        final String jwt = authenticationHeader.substring(7);
        final String userEmail = jwtService.extractUsername(jwt);

        if (userEmail == null) {
            throw new TokenNotValidException("The token provided is not valid");
        }

        User user = userService.findByEmail(userEmail);

        Boolean isTokenValid = tokenRepository.findByToken(jwt)
                .map(t -> !t.isExpired() && !t.isRevoked())
                .orElse(false);

        if (!jwtService.isTokenValid(jwt, user) || !isTokenValid) {
            throw new TokenNotValidException("The token provided is not valid");
        }
    }

    private void saveUserToken(String jwtToken, User user) {
        Token token = Token.builder()
                .token(jwtToken)
                .revoked(false)
                .expired(false)
                .user(user)
                .build();

        tokenService.save(token);
    }
}
