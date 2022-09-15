package priv.togrther.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import priv.togrther.back.repo.userRepository;

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


}
