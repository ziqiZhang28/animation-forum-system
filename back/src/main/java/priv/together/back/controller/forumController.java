package priv.together.back.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import priv.together.back.entity.Forum;
import priv.together.back.entity.User;
import priv.together.back.service.forumService;

import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/forum")
public class forumController {
    @Autowired
    forumService forumService;

/*    @PostMapping("/addForum")
    @Operation(summary = "用户添加帖子",
              parameters = {
                @Parameter(name = "title",in = ParameterIn.QUERY,example = "傻逼帖子的题目"),
                @Parameter(name = "content",in=ParameterIn.QUERY,example = "傻逼帖子的内容"),
                @Parameter(name = "classify_id",in = ParameterIn.QUERY,example = "1"),
                @Parameter(name = "user_id",in=ParameterIn.QUERY,example = "2")
              })
    public void addForum(@RequestParam("title")String title,@RequestParam("content")String content,@RequestParam("classify_id")int classify_id,@RequestParam("user_id")Long user_id){
        forumService.addNewForum(title,content,classify_id,user_id);
    }*/

    @PostMapping("/addForum")
    @Operation(summary = "用户添加帖子",
            parameters = {
                    @Parameter(name = "title",in = ParameterIn.QUERY,example = "傻逼帖子的题目"),
                    @Parameter(name = "content",in=ParameterIn.QUERY,example = "傻逼帖子的内容"),
                    @Parameter(name = "classify_id",in = ParameterIn.QUERY,example = "1"),
                    @Parameter(name = "user_id",in=ParameterIn.QUERY,example = "2")
            })
    public Map<String,String> addForum(@RequestBody Map<String,String> data){

        String title=data.get("title");
        String content=data.get("content");
        int classify_id=Integer.parseInt(data.get("classify_id"));
        Long user_id=Long.parseLong(data.get("user_id"));

        forumService.addNewForum(title,content,classify_id,user_id);
        return data;
    }

    @GetMapping("/getAllForums")
    @Operation(summary = "所有帖子列表(全部)")
    public Map<String,Object> getAllForums(){
        Map<String,Object> map=new HashMap<>();
        map.put("code",1);
        map.put("data",forumService.getAllForums());
        return map;
    }

    @DeleteMapping("/deleteOneForum")
    @Operation(summary = "删除某一篇帖子",parameters = {@Parameter(name = "forum_id",in = ParameterIn.QUERY,example = "21")})
    void deleteOneForum(@RequestParam("forum_id")int forum_id){
        forumService.deleteForum(forum_id);
    }


    @GetMapping("/getHotForums")
    @Operation(summary = "(最热)",parameters = {
            @Parameter(name = "classify_id",in=ParameterIn.QUERY,example = "2")
    })
    Map<String,Object> getHotForums(@RequestParam("classify_id") int classify_id){
        Map<String,Object> map=new HashMap<>();
        map.put("code",1);
        map.put("data",forumService.getTopForums(classify_id));
        return map;
    }
    @GetMapping("/getHomeForums")
    @Operation(summary = "返回所有收藏点赞数>=100的帖子列表，降序排列(首页)")
    Map<String,Object> getHomeForums(){
        Map<String,Object> map=new HashMap<>();
        map.put("code",1);
        map.put("data",forumService.getHomeTopForums());
        return map;
    }
    @GetMapping("/getOneForum")
    @Operation(summary = "某一篇具体的帖子",parameters = {@Parameter(name = "forum_id",in=ParameterIn.QUERY,example = "1")})
    Map<String,Object> getOneForum(@RequestParam("forum_id")int forum_id){
        Map<String,Object> map=new HashMap<>();
        map.put("code",1);
        map.put("data",forumService.getOneForum(forum_id));
        return map;
    }

/*    @PutMapping("/updateForum")
    @Operation(summary = "修改帖子的内容",parameters = {
                @Parameter(name = "forum_id",in=ParameterIn.QUERY,example = "1")
    })
    void modifyForumTitle(@Parameter(hidden = true) @RequestParam("forum_id") int forum_id,
                          @RequestBody Forum forum){
        forumService.updateForum(forum.getTitle(),forum.getContent(),forum.getClassify_id(),forum_id);
    }*/

    @PutMapping("/updateForum")
    @Operation(summary = "修改帖子的内容",parameters = {
            @Parameter(name = "forum实体",in=ParameterIn.QUERY,example = "1"),
    })
    public Map<String,Object> modifyForum(@RequestBody Map<String,Object> data){
        ObjectMapper objectMapper=new ObjectMapper();
        Forum forum=objectMapper.convertValue(data.get("forum"),Forum.class);
        forumService.updateForum(forum.getTitle(),forum.getContent(),forum.getClassify_id(),forum.getForum_id());
        return data;
    }

    @GetMapping("/getForumsByClassifyId")
    @Operation(summary = "根据板块Id得到帖子列表",parameters = {
            @Parameter(name = "classify_id",in=ParameterIn.QUERY,example = "2")
    })
    Map<String,Object> getForumsByClassifyId(@RequestParam("classify_id")int classify_id){
        Map<String,Object> map=new HashMap<>();
        map.put("code",1);
        map.put("data",forumService.getForumsByClassifyId(classify_id));
        return map;
    }

    @GetMapping("/getForumsByTime")
    @Operation(summary = "(最新)",parameters = {
            @Parameter(name = "classify_id",in=ParameterIn.QUERY,example = "2")
    })
    Map<String,Object> getForumsByCurrentTime(@RequestParam("classify_id")int classify_id){
        Date cur_date=new Date();
        Date per_date=new Date(cur_date.getTime() - 24*60*60*1000);//前一天
        SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        String date_time=dateFormat.format(per_date);

        Map<String,Object> map=new HashMap<>();
        map.put("code",1);
        map.put("data",forumService.findForumsByDateDes(date_time,classify_id));
        return map;
    }

    @GetMapping("/getForumsByKey")
    @Operation(summary = "根据关键词得到帖子列表，目前只考虑了一个关键词",parameters = {
            @Parameter(name = "key_word",in=ParameterIn.QUERY,example = "傻逼")
    })
    Map<String,Object> getForumsByKey(@RequestParam("key_word")String key_words){
        Map<String,Object> map=new HashMap<>();
        map.put("code",1);
        map.put("data",forumService.findFormsByKey(key_words));
        return map;
    }
}
