package priv.together.back.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import priv.together.back.entity.Board;
import priv.together.back.service.boardService;

import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@RequestMapping("/board")
public class boardController {
    @Autowired
    boardService boardService;

    @PostMapping("/addNewBoard")
    @Operation(summary = "新增公告",parameters = {@Parameter(name = "content",in= ParameterIn.QUERY,example = "公告：新增辛普森一家！！速看！！！")})
    public void addNewBroad(@RequestParam("content")String content){
        Date date=new Date();
        SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        String date_time=dateFormat.format(date);
        boardService.addNewBoard(content,date_time);
    }

    @PostMapping("/getAllBoard")
    @Operation(summary = "得到所有公告")
    public Iterable<Board> getAllBoard(){
        return boardService.getAllBoard();
    }
}
