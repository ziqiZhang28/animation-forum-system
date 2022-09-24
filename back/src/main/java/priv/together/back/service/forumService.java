package priv.together.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import priv.together.back.entity.Forum;

import java.util.List;

@Service
public class forumService {
    @Autowired
    priv.together.back.repo.forumRepository forumRepository;

    public List<Forum> getTopForums(){
        return forumRepository.findTopForums();
    }
}
