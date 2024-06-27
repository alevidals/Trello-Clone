package com.trello.controller;

import com.trello.dto.BoardDto;
import com.trello.mapper.BoardMapper;
import com.trello.model.Board;
import com.trello.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/boards")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @PostMapping
    public ResponseEntity<BoardDto> createBoard(
            @RequestBody BoardDto boardDto,
            Principal user
    ) {
        Board board = BoardMapper.boardDtoToBoard(boardDto);
        Board savedBoard = boardService.save(board, user);

        return new ResponseEntity<>(BoardMapper.boardToBoardDto(savedBoard), HttpStatus.CREATED);
    }

}
