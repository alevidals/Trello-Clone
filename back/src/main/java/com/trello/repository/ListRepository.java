package com.trello.repository;

import com.trello.model.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ListRepository extends JpaRepository<List, String> {

    java.util.List<List> findAllByBoardId(String id);

}
