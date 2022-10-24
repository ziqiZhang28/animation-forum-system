package priv.together.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import priv.together.back.entity.Forum;
import priv.together.back.repo.CommentRepository;
import priv.together.back.repo.forumRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class forumService {
    @Autowired
    forumRepository forumRepository;
    @Autowired
    CommentRepository commentRepository;

    public List<Forum> getTopForums(){
        return forumRepository.findTopForums();
    }

    public void addNewForum(String title,String content,int classify_id){
        forumRepository.newForum(title,content,classify_id);
    }

    public Optional<Forum> getOneForum(int forum_id){
        return forumRepository.findById(forum_id);
    }

    public void updateForum(String title,String content,int classify_id,int forum_id){
        forumRepository.updateForum(title,content,classify_id,forum_id);
    }

    public void deleteForum(int forum_id){
        commentRepository.deleteByForum_id(forum_id);
        forumRepository.deleteByForum_id(forum_id);
    }

    public Iterable<Forum> getForumsByClassifyId(int classify_id){
        return forumRepository.findByClassify_id(classify_id);
    }

    public Iterable<Forum> findForumsByDateDes(String current_time){
        return forumRepository.findForumsByDateDes(current_time);
    }

    public Iterable<Forum> findFormsByKey(String key){
        return forumRepository.findForumsByUniqWord(key);
    }

    public Iterable<Forum> getAllForums(){
        return forumRepository.findAll();
    }
}
