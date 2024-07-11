package com.trello.service.impl;

import com.trello.exception.ForbiddenException;
import com.trello.model.Card;
import com.trello.model.User;
import com.trello.repository.CardRepository;
import com.trello.service.CardService;
import com.trello.service.ListService;
import com.trello.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CardServiceImpl implements CardService {

    private final CardRepository cardRepository;
    private final ListService listService;

    @Override
    public List<Card> findByListId(String listId) {
        return cardRepository.findByListId(listId);
    }

    @Override
    public Card save(Card card, Principal user) {
        User currentUser = SecurityUtils.getCurrentUser(user);

        com.trello.model.List list = listService
                .findOne(card.getList().getId());

        boolean listBelongsToUser = list.getBoard()
                .getUser().getId()
                .equals(currentUser.getId());

        if (!listBelongsToUser) {
            throw new ForbiddenException();
        }

        card.setList(list);
        return cardRepository.save(card);
    }

    @Override
    public boolean exists(String id) {
        return cardRepository.existsById(id);
    }

    @Override
    public void delete(String id, Principal user) {
        User currentUser = SecurityUtils.getCurrentUser(user);

        boolean cardBelongsToUser = cardRepository
                .findById(id)
                .map(card -> card.getList().getBoard().getUser().getId().equals(currentUser.getId()))
                .orElse(false);

        if (!cardBelongsToUser) {
            throw new ForbiddenException();
        }

        cardRepository.deleteById(id);
    }

    @Override
    public Card update(String id, Card card, Principal user) {
        User currentUser = SecurityUtils.getCurrentUser(user);

        return cardRepository.findById(id)
                .map(existingCard -> {
                    if (!existingCard.getList().getBoard().getUser().getId().equals(currentUser.getId())) {
                        throw new ForbiddenException();
                    }

                    Optional.ofNullable(card.getTitle()).ifPresent(existingCard::setTitle);
                    Optional.ofNullable(card.getDescription()).ifPresent(existingCard::setDescription);

                    if (card.getList().getId() != null) {
                        com.trello.model.List list = listService
                                .findOne(card.getList().getId());

                        existingCard.setList(list);
                    }

                    return cardRepository.save(existingCard);
                })
                .orElseThrow(ForbiddenException::new);
    }
}
