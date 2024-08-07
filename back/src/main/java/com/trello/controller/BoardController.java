package com.trello.controller;

import com.trello.dto.board.BoardDto;
import com.trello.dto.board.DetailedBoardDto;
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

    @GetMapping("/{id}")
    public ResponseEntity<DetailedBoardDto> getBoard(
            @PathVariable String id,
            Principal user
    ) {
        if (!boardService.exists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        DetailedBoardDto detailedBoardDto = boardService.findOneDetailed(id, user);

        return new ResponseEntity<>(detailedBoardDto, HttpStatus.OK);
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

    @PatchMapping("/{id}")
    public ResponseEntity<BoardDto> updateBoard(
            @PathVariable String id,
            @RequestBody BoardDto boardDto,
            Principal user
    ) {
        if (!boardService.exists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Board board = BoardMapper.boardDtoToBoard(boardDto);
        Board updatedBoard = boardService.update(id, board, user);

        return new ResponseEntity<>(BoardMapper.boardToBoardDto(updatedBoard), HttpStatus.OK);
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
