package priv.together.back.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import priv.together.back.entity.Comment;
import priv.together.back.service.commentService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/comment")
public class commentController {
    @Autowired
    commentService commentService;

    @PostMapping("/addCommentToForum")
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
    @Operation(summary = "MAP类型(0即是根评论一组)得到某篇帖子的所有评论，以根评论id为一组",parameters = {@Parameter(name = "forum_id",in = ParameterIn.QUERY,example = "2")})
    public Map<Integer,List<Comment>> getForumComment(@RequestParam("forum_id")int forum_id){
        return commentService.getForumComment(forum_id);
    }

    @PostMapping("/addReplyToComment")
    @Operation(summary = "对评论进行回复",parameters = {
            @Parameter(name = "content",in=ParameterIn.QUERY,example = "回复根评论"),
            @Parameter(name = "user_id",in = ParameterIn.QUERY,example = "2")
    })
    public void addReplyToComment(@RequestBody Comment oldComment,@RequestParam("content") String content,@RequestParam("user_id") Long user_id){
        commentService.addReplyToComment(oldComment,content,user_id);
    }

    @DeleteMapping("/deleteComment")
    @Operation(summary = "删除评论",parameters = {
            @Parameter(name = "comment_id",in=ParameterIn.QUERY,example = "4")
    })
    public void deleteComment(@RequestParam("comment_id")int comment_id){
        commentService.deleteCommentById(comment_id);
    }
}
