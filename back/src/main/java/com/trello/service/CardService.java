package com.trello.service;

import com.trello.model.Card;

import java.security.Principal;
import java.util.List;

public interface CardService {
    List<Card> findByListId(String listId);

    Card save(Card card, Principal user);

    boolean exists(String id);

    void delete(String id, Principal user);

    Card update(String id, Card card, Principal user);
}
