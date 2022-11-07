package priv.together.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import priv.together.back.entity.Forum;
import priv.together.back.entity.ForumVO;
import priv.together.back.entity.Likes;
import priv.together.back.repo.likesRepository;
import priv.together.back.repo.forumRepository;
import priv.together.back.repo.userRepository;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class likesService {
    @Autowired
    likesRepository likesRepository;
    @Autowired
    forumRepository forumRepository;
    @Autowired
    userRepository userRepository;

    SimpleDateFormat sdf=new SimpleDateFormat();

    public List<ForumVO> getAllLikes(Long user_id){
        List<ForumVO> likes=new ArrayList<>();
        for(Likes li: likesRepository.findAllByUser_id(user_id)){
            Forum f =forumRepository.findByForum_id(li.getForum_id());
            likes.add(new ForumVO(f.getForum_id(),
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
        return likes;
    }

    public void likeOneForum(Long user_id,int forum_id){
        forumRepository.likeForum(forum_id);
        likesRepository.likeOneForum(user_id,forum_id);
    }

    public void dislikeOneForum(Long user_id,int forum_id){
        forumRepository.dislikeForum(forum_id);
        likesRepository.dislikeOneForum(user_id,forum_id);
    }
}
