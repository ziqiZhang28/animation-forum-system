package priv.togrther.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import priv.togrther.back.service.userService;

@RestController
@RequestMapping("/api")
public class loginController {
    @Autowired
    userService user_service;

    @PostMapping("/login")
    String userExit(@RequestParam("username") String username,@RequestParam("password")String password){
        if(user_service.ifUserExist(username,password)){
            return "该用户存在";
        }else{
            return "不存在该用户，请注册";
        }
    }
}
