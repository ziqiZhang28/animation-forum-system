package priv.together.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import priv.together.back.entity.Comment;
import priv.together.back.entity.CommentVo;
import priv.together.back.repo.CommentRepository;
import priv.together.back.repo.userRepository;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class commentService {
    @Autowired
    CommentRepository commentResitory;
    @Autowired
    userRepository userRepository;

    SimpleDateFormat sdf=new SimpleDateFormat();

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
                                            userRepository.getNicknameByUser_id(c.getUser_id()),
                                            sdf.format(c.getTime()),
                                            userRepository.getUserFaceByUser_id(c.getUser_id()),
                                            userRepository.getNicknameByUser_id(commentResitory.getUserIdbyComment_id(c.getTo_comment_id())))
            );
        }
        map.put(0,root_comment);
        List<CommentVo> commentVos=new ArrayList<>();
        for(CommentVo c:root_comment){
            int root_comment_id=c.getComment_id();
            List<Comment> comments=commentResitory.getCommentByForum_idAndRoot_comment_id(forum_id,root_comment_id);
            for(Comment cl:comments){
                //System.out.println("时间是："+sdf.format(cl.getTime()));
                commentVos.add(new CommentVo(cl.getComment_id(),
                        cl.getContent(),
                        cl.getUser_id(),
                        cl.getForum_id(),
                        cl.getRoot_comment_id(),
                        cl.getTo_comment_id(),
                        userRepository.getNicknameByUser_id(cl.getUser_id()),
                        sdf.format(cl.getTime()),
                        userRepository.getUserFaceByUser_id(cl.getUser_id()),
                        userRepository.getNicknameByUser_id(commentResitory.getUserIdbyComment_id(cl.getTo_comment_id())))
                );
            }

        }
        map.put(1,commentVos);
        return map;
    }

    public void addReplyToComment(String content,Long user_id,int comment_id){
        Comment origin=commentResitory.getCommentByComment_id(comment_id);
        if(origin.getRoot_comment_id()==0){
            commentResitory.addReplyToComment(content,user_id,origin.getForum_id(), origin.getComment_id());
        }else{
            commentResitory.addReplyToComment(content,user_id,origin.getForum_id(), origin.getRoot_comment_id(), origin.getComment_id());
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
