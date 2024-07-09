package com.trello.mapper;

import com.trello.dto.CardDto;
import com.trello.model.Card;
import com.trello.model.List;

public final class CardMapper {
    public static Card cardDtoToCard(CardDto cardDto) {
        return Card.builder()
                .title(cardDto.getTitle())
                .description(cardDto.getDescription())
                .list(List.builder()
                        .id(cardDto.getListId())
                        .build())
                .build();
    }

    public static CardDto cardToCardDto(Card card) {
        return CardDto.builder()
                .id(card.getId())
                .title(card.getTitle())
                .description(card.getDescription())
                .listId(card.getList().getId())
                .build();
    }
}
