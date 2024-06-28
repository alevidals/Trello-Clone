package com.trello.service;

import com.trello.model.Card;

import java.util.List;

public interface CardService {
    List<Card> findByListId(String listId);
}
