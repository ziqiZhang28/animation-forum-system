package priv.together.back.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import priv.together.back.entity.Classify;
import priv.together.back.service.classifyService;

@RestController
@RequestMapping("/classify")
public class classifyController {
    @Autowired
    classifyService classifyService;

    @GetMapping("/classify")
    @Operation(summary = "所有板块分类")
    public Iterable<Classify> getAllClassify(){
        return classifyService.getClassify();
    }

    @PostMapping("/addClassify")
    @Operation(summary = "新增板块分类",parameters = {
            @Parameter(name = "name",in = ParameterIn.QUERY,example = "超级英雄")
    })
    void addNewClassify(@RequestParam("name")String name){
        classifyService.addClassify(name);
    }


    @PutMapping("/updateClassify")
    @Operation(summary = "修改板块名称",parameters = {
            @Parameter(name = "name",in=ParameterIn.QUERY,example = "Spider Man"),
            @Parameter(name = "classify_id",in = ParameterIn.QUERY,example = "2")})
    public void updateClassify(@RequestParam("name")String name,@RequestParam("classify_id") int classify_id){
        classifyService.modifyClassify(name,classify_id);
    }

    @DeleteMapping("/deleteClassify")
    @Operation(summary = "删除板块",parameters = {@Parameter(name = "classify_id",in = ParameterIn.QUERY,example = "1")})
    public void deleteClassify(@RequestParam("classify_id")int classify_id){
        classifyService.deleteClassify(classify_id);
    }
}
