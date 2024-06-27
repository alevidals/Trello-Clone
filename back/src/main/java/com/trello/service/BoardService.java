package com.trello.service;

import com.trello.model.Board;

import java.security.Principal;
import java.util.List;

public interface BoardService {
    Board save(Board board, Principal user);

    List<Board> findAll(Principal user);

    void delete(String id, Principal principal);

    boolean exists(String id);
}
