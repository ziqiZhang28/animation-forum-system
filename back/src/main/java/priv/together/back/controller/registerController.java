package priv.together.back.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import priv.together.back.service.userService;

@RestController
@RequestMapping("register")
public class registerController {
    @Autowired
    userService userService;

    @PostMapping("/addUser")
    @Operation(summary = "新增用户",
                parameters = {@Parameter(name = "username",in = ParameterIn.QUERY,example = "账号sysnet"),
                              @Parameter(name = "password",in = ParameterIn.QUERY,example = "密码123"),
                              @Parameter(name = "nickname",in = ParameterIn.QUERY,example = "昵称"),
                              @Parameter(name = "email",in=ParameterIn.QUERY,example = "1234324@qq.com"),
                              @Parameter(name = "userface",in = ParameterIn.QUERY,example = "base64转码，存入数据库")})
    void addNewUser(@RequestParam("username")String username,
                    @RequestParam("password")String password,
                    @RequestParam("nickname")String nickname,
                    @RequestParam("email")String email,
                    @RequestParam("userface")String userface){
        userService.addNewUser(username,password,nickname,email,userface);
    }
}
