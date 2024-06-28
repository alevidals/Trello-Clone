package com.trello.service.impl;

import com.trello.repository.ListRepository;
import com.trello.service.ListService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class ListServiceImpl implements ListService {

    private final ListRepository listRepository;

    @Override
    public List<com.trello.model.List> findByBoardId(String boardId) {
        return listRepository.findAllByBoardId(boardId);
    }
}
