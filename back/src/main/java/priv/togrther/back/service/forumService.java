package priv.togrther.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import priv.togrther.back.entity.Forum;
import priv.togrther.back.repo.forumRepository;

import java.util.List;

@Service
public class forumService {
    @Autowired
    forumRepository forumRepository;

    public List<Forum> getTopForums(){
        return forumRepository.findTopForums();
    }
}
