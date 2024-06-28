package com.trello.service;

import java.util.List;

public interface ListService {
    List<com.trello.model.List> findByBoardId(String boardId);
}
