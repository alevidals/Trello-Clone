package com.trello.repository;

import com.trello.model.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, String> {

    List<Board> findAllByUserId(String userId);

}
