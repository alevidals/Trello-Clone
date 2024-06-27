package com.trello.service;

import com.trello.model.Token;

public interface TokenService {

    void save(Token token);

    void revokeAllUserTokens(String id);

}
