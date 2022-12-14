package priv.together.back.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import priv.together.back.entity.Classify;
import priv.together.back.service.classifyService;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/classify")
public class classifyController {
    @Autowired
    classifyService classifyService;

    @GetMapping("/classify")
    @Operation(summary = "所有板块分类")
    public Map<String,Object> getAllClassify(){
        Map<String,Object> map=new HashMap<>();
        map.put("code",1);
        map.put("data",classifyService.getClassify());
        return map;
    }

/*    @PostMapping("/addClassify")
    @Operation(summary = "新增板块分类",parameters = {
            @Parameter(name = "title",in = ParameterIn.QUERY,example = "超级英雄"),
            @Parameter(name = "description",in = ParameterIn.QUERY,example = "This is superman!")
    })
    void addNewClassify(@RequestParam("title")String title,@RequestParam("description")String description){
        classifyService.addClassify(title,description);
    }*/

    @PostMapping("/addClassify")
    @Operation(summary = "新增板块分类",parameters = {
            @Parameter(name = "title",in = ParameterIn.QUERY,example = "超级英雄"),
            @Parameter(name = "description",in = ParameterIn.QUERY,example = "This is superman!")
    })
    public Map<String,String> addNewClassify(@RequestBody Map<String,String> data){
        System.out.println(data);
        String title=data.get("title");
        String description=data.get("description");
        classifyService.addClassify(title,description);
        return data;
    }


    /*@PutMapping("/updateClassify")
    @Operation(summary = "修改板块名称",parameters = {
            @Parameter(name = "name",in=ParameterIn.QUERY,example = "Spider Man"),
            @Parameter(name = "classify_id",in = ParameterIn.QUERY,example = "2")})
    public void updateClassify(@RequestParam("name")String name,@RequestParam("classify_id") int classify_id){
        classifyService.modifyClassify(name,classify_id);
    }*/

    @PutMapping("/updateClassify")
    @Operation(summary = "修改板块名称",parameters = {
            @Parameter(name = "name",in=ParameterIn.QUERY,example = "Spider Man"),
            @Parameter(name = "classify_id",in = ParameterIn.QUERY,example = "2")})
    public Map<String,String> updateClassify(@RequestBody Map<String,String> data){
        System.out.println(data);
        String name=data.get("name");
        int classify_id=Integer.parseInt(data.get("classify_id"));
        classifyService.modifyClassify(name,classify_id);
        return data;
    }

    @GetMapping("/getClassifyById")
    @Operation(summary = "通过板块Id查找",parameters = {
            @Parameter(name = "classify_id",in = ParameterIn.QUERY,example = "2")
    })
    public Map<String,Object> getClassifyById(@RequestParam("classify_id")int classify_id){
        Map<String,Object> map=new HashMap<>();
        map.put("code",1);
        map.put("data",classifyService.getClassifyById(classify_id));
        return map;
    }

   @DeleteMapping("/deleteClassify")
    @Operation(summary = "删除板块",parameters = {@Parameter(name = "classify_id",in = ParameterIn.QUERY,example = "1")})
    public void deleteClassify(@RequestParam("classify_id")int classify_id){
        classifyService.deleteClassify(classify_id);
    }
}
