package com.trello.mapper;

import com.trello.dto.ListDto;
import com.trello.model.Board;
import com.trello.model.List;

public final class ListMapper {
    public static List listDtoToList(ListDto listDto) {
        return List.builder()
                .title(listDto.getTitle())
                .board(Board.builder().id(listDto.getBoardId()).build())
                .build();
    }

    public static ListDto listToListDto(List list) {
        return ListDto.builder()
                .id(list.getId())
                .title(list.getTitle())
                .boardId(list.getBoard().getId())
                .build();
    }
}
