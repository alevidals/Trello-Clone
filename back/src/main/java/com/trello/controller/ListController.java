package com.trello.controller;

import com.trello.dto.ListDto;
import com.trello.mapper.ListMapper;
import com.trello.model.List;
import com.trello.service.ListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/lists")
@RequiredArgsConstructor
public class ListController {

    private final ListService listService;

    @PostMapping
    public ResponseEntity<ListDto> createList(
            @RequestBody ListDto listDto,
            Principal user
    ) {
        List list = ListMapper.listDtoToList(listDto);
        List savedList = listService.save(list, user);

        return new ResponseEntity<>(ListMapper.listToListDto(savedList), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteList(
            @PathVariable String id,
            Principal user
    ) {
        if (!listService.exists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        listService.delete(id, user);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ListDto> updateList(
            @PathVariable String id,
            @RequestBody ListDto listDto,
            Principal user
    ) {
        if (!listService.exists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        List list = ListMapper.listDtoToList(listDto);
        List updatedList = listService.update(id, list, user);

        return new ResponseEntity<>(ListMapper.listToListDto(updatedList), HttpStatus.OK);
    }

}
