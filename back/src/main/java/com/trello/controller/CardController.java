package com.trello.controller;

import com.trello.dto.CardDto;
import com.trello.mapper.CardMapper;
import com.trello.model.Card;
import com.trello.service.CardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/cards")
@RequiredArgsConstructor
public class CardController {

    private final CardService cardService;

    @PostMapping
    public ResponseEntity<CardDto> createCard(
            @RequestBody CardDto cardDto,
            Principal user
    ) {
        Card card = CardMapper.cardDtoToCard(cardDto);
        Card savedCard = cardService.save(card, user);

        return new ResponseEntity<>(CardMapper.cardToCardDto(savedCard), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCard(
            @PathVariable String id,
            Principal user
    ) {
        if (!cardService.exists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        cardService.delete(id, user);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<CardDto> updateCard(
            @PathVariable String id,
            @RequestBody CardDto cardDto,
            Principal user
    ) {
        if (!cardService.exists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Card card = CardMapper.cardDtoToCard(cardDto);
        Card updateCard = cardService.update(id, card, user);

        return new ResponseEntity<>(CardMapper.cardToCardDto(updateCard), HttpStatus.OK);
    }

}
