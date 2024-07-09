package com.trello.service;

import java.security.Principal;
import java.util.List;

public interface ListService {
    List<com.trello.model.List> findByBoardId(String boardId);

    com.trello.model.List findOne(String id);

    com.trello.model.List save(com.trello.model.List list, Principal user);

    boolean exists(String id);

    void delete(String id, Principal user);

    com.trello.model.List update(String id, com.trello.model.List list, Principal user);
}
