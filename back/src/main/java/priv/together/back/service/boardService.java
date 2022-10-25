package priv.together.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import priv.together.back.entity.Board;
import priv.together.back.entity.BoardSimplify;
import priv.together.back.repo.boardRepository;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@Service
public class boardService {
    @Autowired
    boardRepository boardResitory;

    SimpleDateFormat sdf=new SimpleDateFormat();

    public void addNewBoard(String content){
        boardResitory.addNewBoard(content);
    }

    public List<BoardSimplify> getAllBoard(){
        List<Board> boards=boardResitory.findAll();
        List<BoardSimplify> list=new ArrayList<>();
        for(Board board:boards){
            list.add(new BoardSimplify(board.getBoard_id(),board.getContent(),sdf.format(board.getBoard_time())));
        }
        return list;
    }

}
