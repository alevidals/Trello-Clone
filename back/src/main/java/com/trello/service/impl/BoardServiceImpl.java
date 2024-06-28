package com.trello.service.impl;

import com.trello.exception.ForbiddenException;
import com.trello.model.Board;
import com.trello.model.User;
import com.trello.repository.BoardRepository;
import com.trello.service.BoardService;
import com.trello.utils.SecurityUtils;
import com.trello.utils.UserUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

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

    @Override
    public List<Board> findAll(Principal user) {
        User currentUser = SecurityUtils.getCurrentUser(user);

        System.out.println(currentUser.getRole());

        if (UserUtils.isAdmin(currentUser)) {
            return boardRepository.findAll();
        }

        return boardRepository.findAllByUserId(currentUser.getId());
    }

    @Override
    public void delete(String id, Principal user) {
        User currentUser = SecurityUtils.getCurrentUser(user);

        boolean boardBelongsToUser = boardRepository
                .findById(id)
                .map(board -> board.getUser().getId().equals(currentUser.getId()))
                .orElse(false);

        if (!boardBelongsToUser) {
            throw new ForbiddenException();
        }

        boardRepository.deleteById(id);

    }

    @Override
    public boolean exists(String id) {
        return boardRepository.existsById(id);
    }

    @Override
    public Board update(String id, Board board, Principal user) {
        User currentUser = SecurityUtils.getCurrentUser(user);

        return boardRepository.findByIdAndUserId(id, currentUser.getId())
                .map(existingBoard -> {
                    Optional.ofNullable(board.getTitle()).ifPresent(existingBoard::setTitle);

                    return boardRepository.save(existingBoard);
                })
                .orElseThrow(ForbiddenException::new);
    }
}
