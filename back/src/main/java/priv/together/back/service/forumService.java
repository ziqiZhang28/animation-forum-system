package priv.together.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import priv.together.back.entity.Forum;

import java.util.List;
import java.util.Optional;

@Service
public class forumService {
    @Autowired
    priv.together.back.repo.forumRepository forumRepository;

    public List<Forum> getTopForums(){
        return forumRepository.findTopForums();
    }

    public void addNewForum(String title,String content,int classify_id){
        forumRepository.newForum(title,content,classify_id);
    }

    public Optional<Forum> getOneForum(int forum_id){
        return forumRepository.findById(forum_id);
    }

    public void deleteOneForum(int forum_id){
        forumRepository.deleteById(forum_id);
    }

    public void updateForum(String title,String content,int classify_id,int forum_id){
        forumRepository.updateForum(title,content,classify_id,forum_id);
    }
}
