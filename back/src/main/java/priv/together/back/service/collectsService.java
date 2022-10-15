package priv.together.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import priv.together.back.entity.Collects;
import priv.together.back.entity.Forum;
import priv.together.back.entity.Likes;
import priv.together.back.repo.collectsRepository;
import priv.together.back.repo.forumRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class collectsService {
    @Autowired
    collectsRepository collectsRepository;
    @Autowired
    forumRepository forumRepository;

    public List<Forum> getAllCollects(Long user_id){
        List<Forum> collects=new ArrayList<>();
        for(Collects li: collectsRepository.findAllByUser_id(user_id)){
            collects.add(forumRepository.findByForum_id(li.getForum_id()));
        }
        return collects;
    }
}
