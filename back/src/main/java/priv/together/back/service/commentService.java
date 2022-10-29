package priv.together.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import priv.together.back.entity.Comment;
import priv.together.back.entity.CommentVo;
import priv.together.back.repo.CommentRepository;
import priv.together.back.repo.userRepository;

import java.util.*;

@Service
public class commentService {
    @Autowired
    CommentRepository commentResitory;
    @Autowired
    userRepository userRepository;

    public void addRootComment(String content,Long user_id,int forum_id){
        commentResitory.addNewCommentToForum(content, user_id, forum_id);
    }

    public Map<Integer,List<CommentVo>> getForumComment(int forum_id){
        List<Comment> origin_root_comment=commentResitory.getRootCommentByForum_id(forum_id);
        List<CommentVo> root_comment=new ArrayList<>();
        Map<Integer,List<CommentVo>> map=new HashMap<>();
        for(Comment c:origin_root_comment){
            root_comment.add(new CommentVo(c.getComment_id(),
                                            c.getContent(),
                                            c.getUser_id(),
                                            c.getForum_id(),
                                            c.getRoot_comment_id(),
                                            c.getTo_comment_id(),
                                            userRepository.getNicknameByUser_id(c.getUser_id()))
            );
        }
        map.put(0,root_comment);
        for(CommentVo c:root_comment){
            int root_comment_id=c.getComment_id();
            List<Comment> comments=commentResitory.getCommentByForum_idAndRoot_comment_id(forum_id,root_comment_id);
            List<CommentVo> commentVos=new ArrayList<>();
            for(Comment cl:comments){
                commentVos.add(new CommentVo(cl.getComment_id(),
                        cl.getContent(),
                        cl.getUser_id(),
                        cl.getForum_id(),
                        cl.getRoot_comment_id(),
                        cl.getTo_comment_id(),
                        userRepository.getNicknameByUser_id(cl.getUser_id()))
                );
            }
            map.put(root_comment_id,commentVos);
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
