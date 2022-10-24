package priv.together.back.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import priv.together.back.entity.Board;
import priv.together.back.service.boardService;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/board")
public class boardController {
    @Autowired
    boardService boardService;

    @PostMapping("/addNewBoard")
    @Operation(summary = "新增公告",parameters = {@Parameter(name = "content",in= ParameterIn.QUERY,example = "公告：新增辛普森一家！！速看！！！")})
    public void addNewBroad(@RequestParam("content")String content){
        boardService.addNewBoard(content);
    }

    @GetMapping("/getAllBoard")
    @Operation(summary = "得到所有公告")
    public Map<String,Object> getAllBoard(){
        Map<String,Object> map=new HashMap<>();
        map.put("code",1);
        map.put("data",boardService.getAllBoard());
        return map;
    }
}
