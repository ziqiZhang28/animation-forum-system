package priv.together.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import priv.together.back.entity.Board;
import priv.together.back.repo.boardRepository;

@Service
public class boardService {
    @Autowired
    boardRepository boardResitory;

    public void addNewBoard(String content,String board_time){
        boardResitory.addNewBoard(content,board_time);
    }

    public Iterable<Board> getAllBoard(){
        return boardResitory.findAll();
    }

}
