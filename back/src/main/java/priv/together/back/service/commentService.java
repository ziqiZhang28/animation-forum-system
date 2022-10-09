package priv.together.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import priv.together.back.entity.Comment;
import priv.together.back.repo.commentResitory;

import java.util.Objects;

@Service
public class commentService {
    @Autowired
    commentResitory commentResitory;

    public void addRootComment(String content,Long user_id,int forum_id){
        commentResitory.addNewCommentToForum(content, user_id, forum_id);
    }

    public Iterable<Comment> getForumComment(int forum_id){
        return commentResitory.getCommentByForum_id(forum_id);
    }

    public void addReplyToComment(Comment oldComment,String content,Long user_id){
        if(oldComment.getRoot_comment_id()==0){
            commentResitory.addReplyToComment(content,user_id,oldComment.getForum_id(), oldComment.getComment_id());
        }else{
            commentResitory.addReplyToComment(content,user_id, oldComment.getForum_id(),oldComment.getRoot_comment_id(), oldComment.getComment_id());
        }

    }
}
