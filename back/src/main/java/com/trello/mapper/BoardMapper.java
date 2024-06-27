package com.trello.mapper;

import com.trello.dto.BoardDto;
import com.trello.model.Board;

public final class BoardMapper {
    public static Board boardDtoToBoard(BoardDto boardDto) {
        return Board.builder()
                .title(boardDto.getTitle())
                .build();
    }

    public static BoardDto boardToBoardDto(Board board) {
        return BoardDto.builder()
                .id(board.getId())
                .title(board.getTitle())
                .build();
    }
}
