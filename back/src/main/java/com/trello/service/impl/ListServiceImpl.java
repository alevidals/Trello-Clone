package com.trello.service.impl;

import com.trello.exception.ForbiddenException;
import com.trello.exception.ItemNotFoundException;
import com.trello.model.Board;
import com.trello.model.User;
import com.trello.repository.ListRepository;
import com.trello.service.BoardService;
import com.trello.service.ListService;
import com.trello.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor(onConstructor_ = {@Lazy})
public class ListServiceImpl implements ListService {

    private final ListRepository listRepository;
    private final BoardService boardService;

    @Override
    public List<com.trello.model.List> findByBoardId(String boardId) {
        return listRepository.findAllByBoardId(boardId);
    }

    @Override
    public com.trello.model.List findOne(String id) {
        return listRepository
                .findById(id)
                .orElseThrow(() -> new ItemNotFoundException("List not found with id " + id));
    }

    @Override
    public com.trello.model.List save(com.trello.model.List list, Principal user) {
        User currentUser = SecurityUtils.getCurrentUser(user);

        Board board = boardService.findOne(list.getBoard().getId(), user);
        list.setBoard(board);

        return listRepository.save(list);
    }

    @Override
    public boolean exists(String id) {
        return listRepository.existsById(id);
    }

    @Override
    public void delete(String id, Principal user) {
        User currentUser = SecurityUtils.getCurrentUser(user);

        boolean listsBelongsToUser = listRepository
                .findById(id)
                .map(list -> list.getBoard().getUser().getId().equals(currentUser.getId()))
                .orElse(false);

        if (!listsBelongsToUser) {
            throw new ForbiddenException();
        }

        listRepository.deleteById(id);
    }

    @Override
    public com.trello.model.List update(String id, com.trello.model.List list, Principal user) {
        User currentUser = SecurityUtils.getCurrentUser(user);

        return listRepository.findById(id)
                .map(existingList -> {
                    if (!existingList.getBoard().getUser().getId().equals(currentUser.getId())) {
                        throw new ForbiddenException();
                    }

                    Optional.ofNullable(list.getTitle()).ifPresent(existingList::setTitle);

                    return listRepository.save(existingList);
                })
                .orElseThrow(ForbiddenException::new);
    }
}
