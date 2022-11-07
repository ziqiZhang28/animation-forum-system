package priv.together.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import priv.together.back.entity.Forum;
import priv.together.back.entity.ForumSimplify;
import priv.together.back.entity.ForumVO;
import priv.together.back.repo.ClassifyRepository;
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
    @Autowired
    ClassifyRepository classifyRepository;

    SimpleDateFormat sdf=new SimpleDateFormat();
    public  List<ForumVO> getHomeTopForums(){
        List<Forum> list=forumRepository.findHomeTopForums();
        List<ForumVO> topForum=new ArrayList<>();

        for(Forum f: list){
            topForum.add(new ForumVO(f.getForum_id(),
                    f.getTitle(),
                    f.getContent(),
                    f.getClassify_id(),
                    f.getCollects(),
                    f.getLikes(),
                    userRepository.getNicknameByUser_id(f.getUser_id()),
                    sdf.format(f.getCreate_time()),
                    userRepository.getUserfaceByUser_id(f.getUser_id()))
            );
        }

        return topForum;
    }
    public Forum getCompleteForum(int forum_id){
        return forumRepository.findByForum_id(forum_id);
    }

    public List<ForumVO> getUserForums(Long user_id){
        List<Forum> list=forumRepository.findForumsByUser_id(user_id);
        List<ForumVO> ForumVos=new ArrayList<>();

        for(Forum f:list){
            ForumVos.add(new ForumVO(f.getForum_id(),
                    f.getTitle(),
                    f.getContent(),
                    f.getClassify_id(),
                    f.getCollects(),
                    f.getLikes(),
                    userRepository.getNicknameByUser_id(f.getUser_id()),
                    sdf.format(f.getCreate_time()),
                    userRepository.getUserfaceByUser_id(f.getUser_id()))
            );
        }

        return ForumVos;
    }

    public  List<ForumVO> getTopForums(int classify_id){
        List<Forum> list=forumRepository.findTopForums(classify_id);
        List<ForumVO> topForum=new ArrayList<>();

        for(Forum f: list){
            topForum.add(new ForumVO(f.getForum_id(),
                                    f.getTitle(),
                                    f.getContent(),
                                    f.getClassify_id(),
                                    f.getCollects(),
                                    f.getLikes(),
                                    userRepository.getNicknameByUser_id(f.getUser_id()),
                                    sdf.format(f.getCreate_time()),
                    userRepository.getUserfaceByUser_id(f.getUser_id()))
            );
        }

        return topForum;
    }

    public void addNewForum(String title,String content,int classify_id,Long user_id){
        forumRepository.newForum(title,content,classify_id,user_id);
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
                                                        userRepository.getNicknameByUser_id(forum.getUser_id()),
                                                        sdf.format(forum.getCreate_time()),
                                                        classifyRepository.getTitleByClassify_id(forum.getClassify_id()));
        return forumSimplify;
    }

    public ForumVO findLastestForum(){
        Forum f=forumRepository.findLastestForum();
        return new ForumVO(f.getForum_id(),
                f.getTitle(),
                f.getContent(),
                f.getClassify_id(),
                f.getCollects(),
                f.getLikes(),
                userRepository.getNicknameByUser_id(f.getUser_id()),
                sdf.format(f.getCreate_time()),
                userRepository.getUserfaceByUser_id(f.getUser_id()));
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
                    userRepository.getNicknameByUser_id(forum.getUser_id()),
                    sdf.format(forum.getCreate_time()),
                    classifyRepository.getTitleByClassify_id(forum.getClassify_id()))
            );
        }
        return list;
    }

    public List<ForumSimplify> findForumsByDateDes(String current_time,int classify_id){
        List<Forum> forums= forumRepository.findForumsByDateDes(current_time,classify_id);
        List<ForumSimplify> list=new ArrayList<>();
        for(Forum forum: forums){
            list.add(new ForumSimplify(forum.getForum_id(),
                    forum.getTitle(),
                    forum.getContent(),
                    forum.getClassify_id(),
                    forum.getCollects(),
                    forum.getLikes(),
                    forum.getUser_id(),
                    userRepository.getNicknameByUser_id(forum.getUser_id()),
                    sdf.format(forum.getCreate_time()),
                    classifyRepository.getTitleByClassify_id(forum.getClassify_id()))
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
                    userRepository.getNicknameByUser_id(forum.getUser_id()),
                    sdf.format(forum.getCreate_time()),
                    classifyRepository.getTitleByClassify_id(forum.getClassify_id()))
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
                    userRepository.getNicknameByUser_id(forum.getUser_id()),
                    sdf.format(forum.getCreate_time()),
                    classifyRepository.getTitleByClassify_id(forum.getClassify_id()))
            );
        }
        return list;
    }


}
