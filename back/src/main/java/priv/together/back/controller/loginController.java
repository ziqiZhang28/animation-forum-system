package priv.together.back.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import priv.together.back.service.userService;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
public class loginController {
    @Autowired
    userService user_service;

    @PostMapping("/login")
    @Operation(summary = "需要设置拦截器，暂未完成该接口")
    String userExit(@RequestParam("username") String username, @RequestParam("password")String password){
        if(user_service.ifUserExist(username,password)){
            return "该用户存在";
        }else{
            return "不存在该用户，请注册";
        }
    }
}
