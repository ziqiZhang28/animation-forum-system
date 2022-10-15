package priv.together.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import priv.together.back.entity.Forum;
import priv.together.back.entity.Likes;
import priv.together.back.repo.likesRepository;
import priv.together.back.repo.forumRepository;

import java.util.*;

@Service
public class likesService {
    @Autowired
    likesRepository likesRepository;
    @Autowired
    forumRepository forumRepository;

    public List<Forum> getAllLikes(Long user_id){
        List<Forum> likes=new ArrayList<>();
        for(Likes li: likesRepository.findAllByUser_id(user_id)){
            likes.add(forumRepository.findByForum_id(li.getForum_id()));
        }
        return likes;
    }
}
