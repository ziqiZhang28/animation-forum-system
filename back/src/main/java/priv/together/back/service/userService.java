package priv.together.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import priv.together.back.entity.User;
import priv.together.back.repo.userRepository;

@Service
public class userService {
    @Autowired
    userRepository userRepository;


    public User findByUsername(String username){
        return userRepository.findByUsername(username);
    }

    public void addNewUser(String username,String password,String nickname,String email,String userface){
        userRepository.addOneUser(username,password,nickname,email,userface);
    }

    public void deleteOneUser(Long user_id){
        userRepository.deleteById(user_id);
    }

    public void updateOneUser(String nickname,String email,String userface,Long user_id){
        userRepository.updateUser(nickname, email, userface, user_id);
    }

    public Iterable<User> getAllUsers(){
        return userRepository.findAll();
    }
}
