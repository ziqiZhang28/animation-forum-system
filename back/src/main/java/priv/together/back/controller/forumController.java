package priv.together.back.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import priv.together.back.entity.Forum;
import priv.together.back.service.forumService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class forumController {
    @Autowired
    forumService forumService;

    @PostMapping("/addForum")
    @Operation(summary = "用户添加帖子",
              parameters = {
                @Parameter(name = "title",in = ParameterIn.QUERY,example = "傻逼帖子的题目"),
                @Parameter(name = "content",in=ParameterIn.QUERY,example = "傻逼帖子的内容"),
                @Parameter(name = "classify_id",in = ParameterIn.QUERY,example = "1")
              })
    public void addForum(@RequestParam("title")String title,@RequestParam("content")String content,@RequestParam("classify_id")int classify_id){
        forumService.addNewForum(title,content,classify_id);
    }

    @GetMapping("/getHomeForums")
    @Operation(summary = "返回所有收藏点赞数>=100的帖子列表")
    List<Forum> getHomeForums(){
        return forumService.getTopForums();
    }

    @GetMapping("getOneForum")
    @Operation(summary = "某一篇具体的帖子",parameters = {@Parameter(name = "forum_id",in=ParameterIn.QUERY,example = "1")})
    Optional<Forum> getOneForum(@RequestParam("forum_id")int forum_id){
        return forumService.getOneForum(forum_id);
    }

    @DeleteMapping("deleteOneForum")
    @Operation(summary = "删除某一篇帖子",parameters = {@Parameter(name = "forum_id",in = ParameterIn.QUERY,example = "21")})
    void deleteOneForum(@RequestParam("forum_id")int forum_id){
        forumService.deleteOneForum(forum_id);
    }
}
