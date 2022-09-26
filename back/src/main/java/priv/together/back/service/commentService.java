package priv.together.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import priv.together.back.entity.Comment;
import priv.together.back.repo.commentResitory;

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
}
