package priv.together.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import priv.together.back.entity.Comment;
import priv.together.back.repo.CommentRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class commentService {
    @Autowired
    CommentRepository commentResitory;

    public void addRootComment(String content,Long user_id,int forum_id){
        commentResitory.addNewCommentToForum(content, user_id, forum_id);
    }

    public Map<Integer,List<Comment>> getForumComment(int forum_id){
        List<Comment> root_comment=commentResitory.getRootCommentByForum_id(forum_id);
        Map<Integer,List<Comment>> map=new HashMap<>();
        map.put(0,root_comment);
        for(Comment c:root_comment){
            int root_comment_id=c.getComment_id();
            //System.out.println(root_comment_id);
            map.put(root_comment_id,commentResitory.getCommentByForum_idAndRoot_comment_id(forum_id,root_comment_id));
        }

        return map;
    }

    public void addReplyToComment(Comment oldComment,String content,Long user_id){
        if(oldComment.getRoot_comment_id()==0){
            commentResitory.addReplyToComment(content,user_id,oldComment.getForum_id(), oldComment.getComment_id());
        }else{
            commentResitory.addReplyToComment(content,user_id, oldComment.getForum_id(),oldComment.getRoot_comment_id(), oldComment.getComment_id());
        }

    }

    public void deleteCommentById(Comment comment){
        if(Objects.equals(comment.getRoot_comment_id(),0)){
            commentResitory.deleteByRoot_comment_id(comment.getComment_id());
            commentResitory.deleteById(comment.getComment_id());
        }else{
            commentResitory.deleteById(comment.getComment_id());
        }
    }
}
