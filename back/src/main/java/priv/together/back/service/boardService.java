package priv.together.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import priv.together.back.repo.boardResitory;

@Service
public class boardService {
    @Autowired
    boardResitory boardResitory;

    public void addNewBoard(String name){
        boardResitory.addNewBoard(name);
    }

}
