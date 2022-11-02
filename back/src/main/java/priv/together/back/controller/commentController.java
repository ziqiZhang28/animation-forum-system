package priv.together.back.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import priv.together.back.entity.Comment;
import priv.together.back.service.commentService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/comment")
public class commentController {
    @Autowired
    commentService commentService;

   /* @PostMapping("/addCommentToForum")
    @Operation(summary = "对帖子进行评论",parameters = {
            @Parameter(name = "content",in = ParameterIn.QUERY,example = "这是一条评论"),
            @Parameter(name = "user_id",in = ParameterIn.QUERY,example = "2"),
            @Parameter(name = "forum_id",in = ParameterIn.QUERY,example = "2")
    })
    public void addRootCommentToForum(@RequestParam("content")String content,
                                      @RequestParam("user_id")Long user_id,
                                      @RequestParam("forum_id")int forum_id){
        commentService.addRootComment(content,user_id,forum_id);
    }*/

    @PostMapping("/addCommentToForum")
    @Operation(summary = "对帖子进行评论",parameters = {
            @Parameter(name = "content",in = ParameterIn.QUERY,example = "这是一条评论"),
            @Parameter(name = "user_id",in = ParameterIn.QUERY,example = "2"),
            @Parameter(name = "forum_id",in = ParameterIn.QUERY,example = "2")
    })
    public Map<String,String> addRootCommentToForum(@RequestBody Map<String,String> data){
        String content=data.get("content");
        Long user_id=Long.parseLong(data.get("user_id"));
        int forum_id=Integer.parseInt(data.get("forum_id"));

        commentService.addRootComment(content,user_id,forum_id);
        return data;
    }



    @GetMapping("/getForumComment")
    @Operation(summary = "MAP类型(0即是根评论一组)得到某篇帖子的所有评论，以根评论id为一组",parameters = {@Parameter(name = "forum_id",in = ParameterIn.QUERY,example = "2")})
    public Map<String,Object> getForumComment(@RequestParam("forum_id")int forum_id){
        Map<String,Object> map=new HashMap<>();
        map.put("code",1);
        map.put("data",commentService.getForumComment(forum_id));
        return map;
    }


    /*@PostMapping("/addReplyToComment")
    @Operation(summary = "对评论进行回复,两种情况:1、对根评论进行回复 2、回复根评论下的回复",parameters = {
            @Parameter(name = "content",in=ParameterIn.QUERY,example = "this is 评论"),
            @Parameter(name = "user_id",in = ParameterIn.QUERY,example = "2"),
            @Parameter(name = "comment_id",in = ParameterIn.QUERY,example = "2")
    })
    public void addReplyToComment(@RequestParam("content") String content,@RequestParam("user_id") Long user_id,@RequestParam("comment_id")int commment_id){
        commentService.addReplyToComment(content,user_id,commment_id);
    }*/

    @PostMapping("/addReplyToComment")
    @Operation(summary = "对评论进行回复,两种情况:1、对根评论进行回复 2、回复根评论下的回复",parameters = {
            @Parameter(name = "content",in=ParameterIn.QUERY,example = "this is 评论"),
            @Parameter(name = "user_id",in = ParameterIn.QUERY,example = "2"),
            @Parameter(name = "comment_id",in = ParameterIn.QUERY,example = "2")
    })
    public Map<String,String> addReplyToComment(@RequestBody Map<String,String> data){
        String content=data.get("content");
        Long user_id=Long.parseLong(data.get("user_id"));
        int comment_id=Integer.parseInt(data.get("comment_id"));
        commentService.addReplyToComment(content,user_id,comment_id);
        return data;
    }

    @DeleteMapping("/deleteComment")
    @Operation(summary = "删除评论")
    public void deleteComment(@RequestBody Comment comment){
        commentService.deleteCommentById(comment);
    }
}
