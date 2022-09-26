package priv.together.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import priv.together.back.entity.User;
import priv.together.back.repo.userRepository;

@Service
public class userService {
    @Autowired
    userRepository userRepository;

    public boolean ifUserExist(String username,String password){
        if(userRepository.findByUsernameAndPassword(username, password)!=null){
            return true;
        }else{
            return false;
        }
    }

    public User getUserByUsernameAndPassowrd(String username,String password){
        return userRepository.findByUsernameAndPassword(username,password);
    }


}
