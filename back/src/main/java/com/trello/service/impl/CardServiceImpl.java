package com.trello.service.impl;

import com.trello.model.Card;
import com.trello.repository.CardRepository;
import com.trello.service.CardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CardServiceImpl implements CardService {

    private final CardRepository cardRepository;

    @Override
    public List<Card> findByListId(String listId) {
        return cardRepository.findByListId(listId);
    }
}
