package priv.together.back.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import priv.together.back.service.boardService;

@RestController
@RequestMapping()
public class boardController {
    @Autowired
    boardService boardService;

    @PostMapping("/addNewBroad")
    @Operation(summary = "新增板块分类",parameters = {@Parameter(name = "name",in= ParameterIn.QUERY,example = "欧美动漫")})
    public void addNewBroad(@RequestParam("name")String name){
        boardService.addNewBoard(name);
    }
}
