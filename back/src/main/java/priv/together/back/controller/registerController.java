package priv.together.back.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import priv.together.back.entity.User;
import priv.together.back.service.userService;

import java.util.Map;

@RestController
@RequestMapping("/register")
public class registerController {
    @Autowired
    userService userService;
    //使用BCryptPasswordEncoder进行加密
    private BCryptPasswordEncoder encoder=new BCryptPasswordEncoder();

/*    @PostMapping("/addUser")
    @Operation(summary = "新增用户")
    public void addNewUser(@RequestBody User user){
        String password= encoder.encode(user.getPassword());
        //System.out.println(password);
        userService.addNewUser(user.getUsername(),password,user.getNickname(),user.getEmail(),user.getUserface());
    }*/

    @PostMapping("/addUser")
    @Operation(summary = "新增用户")
    public Map<String,Object> Test(@RequestBody Map<String,Object> data){
        ObjectMapper objectMapper=new ObjectMapper();
        User user=objectMapper.convertValue(data.get("user"),User.class);
        String password= encoder.encode(user.getPassword());
        //System.out.println(password);
        userService.addNewUser(user.getUsername(),password,user.getNickname(),user.getEmail(),user.getUserface());
        return data;
    }
}
