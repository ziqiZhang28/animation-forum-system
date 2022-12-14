package priv.together.back.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import priv.together.back.entity.Forum;
import priv.together.back.entity.User;
import priv.together.back.service.userService;
import priv.together.back.util.TokenUtil;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/login")
public class loginController {
    @Autowired
    userService user_service;
    private BCryptPasswordEncoder encoder=new BCryptPasswordEncoder();

    @PostMapping("/login")
    @Operation(summary = "登录设置Token,已完成",
               parameters = {@Parameter(name = "username",in = ParameterIn.QUERY,example = "admin"),
                             @Parameter(name = "password",in = ParameterIn.QUERY,example = "123")})
    Map<String,Object> userLogin(@RequestBody Map<String,String> data){
        String username=data.get("username");
        String password=data.get("password");

        Map<String,Object> map=new HashMap<>();
        Map<String,Object> map_return=new HashMap<>();
        map.put("code",0);
        User user=user_service.findByUsername(username);

        if(user==null){
            map.put("msg","用户不存在！");
        }else if(encoder.matches(user.getPassword(),password)){
            map.put("msg","账号密码错误！");
        }else if(encoder.matches(password,user.getPassword())){
            String token= TokenUtil.generateToken(user);
            map.put("code",1);
            map.put("data",user);
            map.put("token",token);
        }
        map_return.put("data",map);

        return map_return;
    }




}
