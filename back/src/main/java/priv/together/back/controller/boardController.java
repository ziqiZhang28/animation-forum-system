package priv.together.back.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import priv.together.back.service.boardService;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/board")
public class boardController {
    @Autowired
    boardService boardService;

/*
    @PostMapping("/addNewBoard")
    @Operation(summary = "新增公告",parameters = {@Parameter(name = "content",in= ParameterIn.QUERY,example = "公告：新增辛普森一家！！速看！！！")})
    public void addNewBroad(@RequestParam("content")String content){
        boardService.addNewBoard(content);
    }
*/


    @PostMapping("/addNewBoard")
    @Operation(summary = "新增公告",parameters = {@Parameter(name = "content",in= ParameterIn.QUERY,example = "公告：新增辛普森一家！！速看！！！")})
    public Map<String,String> Test(@RequestBody Map<String,String> data){
        //System.out.println(data);
        String content=data.get("content");
        boardService.addNewBoard(content);
        return data;
    }

    @GetMapping("/getAllBoard")
    @Operation(summary = "得到所有公告")
    public Map<String,Object> getAllBoard(){
        Map<String,Object> map=new HashMap<>();
        map.put("code",1);
        map.put("data",boardService.getAllBoard());
        return map;
    }

    @DeleteMapping("/deleteBoard")
    @Operation(summary = "删除公告根据ID",parameters = {
            @Parameter(name = "board_id",in = ParameterIn.QUERY,example = "1")
    })
    public Map<String,String> deleteBoard(@RequestBody Map<String,String> data){
        //System.out.println(data);
        int board_id=Integer.parseInt(data.get("board_id"));
        boardService.deleteBoard(board_id);
        return data;
    }
}
