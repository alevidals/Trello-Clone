package com.trello.controller;

import com.trello.dto.BoardDto;
import com.trello.mapper.BoardMapper;
import com.trello.model.Board;
import com.trello.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/boards")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @GetMapping
    public List<BoardDto> getBoards(Principal user) {
        List<Board> boards = boardService.findAll(user);
        return boards.stream().map(BoardMapper::boardToBoardDto).toList();
    }

    @PostMapping
    public ResponseEntity<BoardDto> createBoard(
            @RequestBody BoardDto boardDto,
            Principal user
    ) {
        Board board = BoardMapper.boardDtoToBoard(boardDto);
        Board savedBoard = boardService.save(board, user);

        return new ResponseEntity<>(BoardMapper.boardToBoardDto(savedBoard), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBoard(
            @PathVariable String id,
            Principal user
    ) {
        if (!boardService.exists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        boardService.delete(id, user);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
