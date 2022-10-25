package priv.together.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import priv.together.back.entity.Forum;
import priv.together.back.entity.ForumSimplify;
import priv.together.back.entity.ForumVO;
import priv.together.back.repo.CommentRepository;
import priv.together.back.repo.forumRepository;
import priv.together.back.repo.userRepository;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class forumService {
    @Autowired
    forumRepository forumRepository;
    @Autowired
    CommentRepository commentRepository;
    @Autowired
    userRepository userRepository;

    SimpleDateFormat sdf=new SimpleDateFormat();

    public  List<ForumVO> getTopForums(){
        List<Forum> list=forumRepository.findTopForums();
        List<ForumVO> topForum=new ArrayList<>();
        ForumVO forumVO=new ForumVO();

        for(Forum f: list){
            forumVO.setForum_id(f.getForum_id());
            forumVO.setClassify_id(f.getClassify_id());
            forumVO.setContent(f.getContent());
            forumVO.setTitle(f.getTitle());
            forumVO.setCollects(f.getCollects());
            forumVO.setLikes(f.getLikes());
            forumVO.setCreate_time(sdf.format(f.getCreate_time()));
            forumVO.setNickname(userRepository.getNicknameByUser_id(f.getUser_id()));
            topForum.add(forumVO);
        }

        return topForum;
    }

    public void addNewForum(String title,String content,int classify_id){
        forumRepository.newForum(title,content,classify_id);
    }

    public ForumSimplify getOneForum(int forum_id){
        Forum forum=forumRepository.findByForum_id(forum_id);
        ForumSimplify forumSimplify=new ForumSimplify(forum.getForum_id(),
                                                        forum.getTitle(),
                                                        forum.getContent(),
                                                        forum.getClassify_id(),
                                                        forum.getCollects(),
                                                        forum.getLikes(),
                                                        forum.getUser_id(),
                                                        sdf.format(forum.getCreate_time()));
        return forumSimplify;
    }

    public void updateForum(String title,String content,int classify_id,int forum_id){
        forumRepository.updateForum(title,content,classify_id,forum_id);
    }

    public void deleteForum(int forum_id){
        commentRepository.deleteByForum_id(forum_id);
        forumRepository.deleteByForum_id(forum_id);
    }

    public List<ForumSimplify> getForumsByClassifyId(int classify_id){
        List<Forum> forums=forumRepository.findByClassify_id(classify_id);
        List<ForumSimplify> list=new ArrayList<>();
        for(Forum forum: forums){
            list.add(new ForumSimplify(forum.getForum_id(),
                    forum.getTitle(),
                    forum.getContent(),
                    forum.getClassify_id(),
                    forum.getCollects(),
                    forum.getLikes(),
                    forum.getUser_id(),
                    sdf.format(forum.getCreate_time()))
            );
        }
        return list;
    }

    public List<ForumSimplify> findForumsByDateDes(String current_time){
        List<Forum> forums= forumRepository.findForumsByDateDes(current_time);
        List<ForumSimplify> list=new ArrayList<>();
        for(Forum forum: forums){
            list.add(new ForumSimplify(forum.getForum_id(),
                    forum.getTitle(),
                    forum.getContent(),
                    forum.getClassify_id(),
                    forum.getCollects(),
                    forum.getLikes(),
                    forum.getUser_id(),
                    sdf.format(forum.getCreate_time()))
            );
        }
        return list;
    }

    public List<ForumSimplify> findFormsByKey(String key){
        List<Forum> forums= forumRepository.findForumsByUniqWord(key);
        List<ForumSimplify> list=new ArrayList<>();
        for(Forum forum: forums){
            list.add(new ForumSimplify(forum.getForum_id(),
                    forum.getTitle(),
                    forum.getContent(),
                    forum.getClassify_id(),
                    forum.getCollects(),
                    forum.getLikes(),
                    forum.getUser_id(),
                    sdf.format(forum.getCreate_time()))
            );
        }
        return list;
    }

    public List<ForumSimplify> getAllForums(){
        List<Forum> forums= forumRepository.findAll();
        List<ForumSimplify> list=new ArrayList<>();
        for(Forum forum: forums){
            list.add(new ForumSimplify(forum.getForum_id(),
                    forum.getTitle(),
                    forum.getContent(),
                    forum.getClassify_id(),
                    forum.getCollects(),
                    forum.getLikes(),
                    forum.getUser_id(),
                    sdf.format(forum.getCreate_time()))
            );
        }
        return list;
    }
}
