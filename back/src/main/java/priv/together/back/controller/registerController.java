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

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
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
    @Operation(summary = "新增用户",parameters = {
            @Parameter(name = "user",in=ParameterIn.QUERY,example = "一个USER实体类型 ")
    })
    public Map<String,Object> Test(@RequestBody Map<String,Object> data){
        ObjectMapper objectMapper=new ObjectMapper();
        User user=objectMapper.convertValue(data.get("user"),User.class);
        String password= encoder.encode(user.getPassword());

        Map<String ,Object> map=new HashMap<>();
        Map<String ,Object> map_return=new HashMap<>();

        if(userService.getUsersByUsername(user.getUsername()).isEmpty()){
            userService.addNewUser(user.getUsername(),password,user.getNickname(),user.getEmail(),user.getUserface());
            map.put("code",1);
        }else{
            map.put("code",0);
        }

        map_return.put("data",map);

        return map_return;
    }
}
