package priv.together.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import priv.together.back.entity.User;
import priv.together.back.repo.userRepository;

import java.util.Optional;

@Service
public class userService {
    @Autowired
    userRepository userRepository;
    BCryptPasswordEncoder encoder=new BCryptPasswordEncoder();

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

    public void updateUserPassword(String password,Long user_id){
        String encode_password=encoder.encode(password);
        userRepository.updatePassword(encode_password,user_id);
    }

    public Optional<User> getOneUser(Long user_id){
        return userRepository.findById(user_id);
    }
}
