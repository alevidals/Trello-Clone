package com.trello.service.impl;

import com.trello.model.Board;
import com.trello.model.User;
import com.trello.repository.BoardRepository;
import com.trello.service.BoardService;
import com.trello.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;

    @Override
    public Board save(Board board, Principal user) {
        User currentUser = SecurityUtils.getCurrentUser(user);
        board.setUser(currentUser);
        return boardRepository.save(board);
    }
}
