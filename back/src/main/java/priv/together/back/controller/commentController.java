package priv.together.back.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import priv.together.back.entity.Comment;
import priv.together.back.service.commentService;

@RestController
@RequestMapping("/comment")
public class commentController {
    @Autowired
    commentService commentService;

    @PostMapping("/addNewCommentToForum")
    @Operation(summary = "对帖子进行评论",parameters = {
            @Parameter(name = "content",in = ParameterIn.QUERY,example = "这是一条评论"),
            @Parameter(name = "user_id",in = ParameterIn.QUERY,example = "2"),
            @Parameter(name = "forum_id",in = ParameterIn.QUERY,example = "2")
    })
    public void addRootCommentToForum(@RequestParam("content")String content,
                                      @RequestParam("user_id")Long user_id,
                                      @RequestParam("forum_id")int forum_id){
        commentService.addRootComment(content,user_id,forum_id);
    }

    @GetMapping("/getForumComment")
    @Operation(summary = "得到某篇帖子的所有评论",parameters = {@Parameter(name = "forum_id",in = ParameterIn.QUERY,example = "2")})
    public Iterable<Comment> getForumComment(@RequestParam("forum_id")int forum_id){
        return commentService.getForumComment(forum_id);
    }
}
