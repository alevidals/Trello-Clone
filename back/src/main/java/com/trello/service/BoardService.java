package com.trello.service;

import com.trello.model.Board;

import java.security.Principal;

public interface BoardService {
    Board save(Board board, Principal user);
}
