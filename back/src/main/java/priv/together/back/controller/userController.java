package priv.together.back.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import priv.together.back.entity.User;
import priv.together.back.service.userService;

@RestController
@RequestMapping("/user")
public class userController {
    @Autowired
    userService userService;

    @GetMapping("/user")
    @Operation(summary = "所有用户列表")
    Iterable<User> getAllUser(){
        return userService.getAllUsers();
    }

    @DeleteMapping("/deleteUser")
    @Operation(summary = "删除用户",parameters = {
            @Parameter(name = "user_id",in= ParameterIn.QUERY,example = "2"),
    })
    void deleteUser(@Parameter(hidden = true)@RequestParam("user_id")Long user_id){
        userService.deleteOneUser(user_id);
    }
    @PutMapping("/updateUser")
    @Operation(summary = "更新用户资料")
    void updateUser(@RequestBody User user){
        userService.updateOneUser(user.getNickname(),user.getEmail(),user.getUserface(),user.getUser_id());
    }


}
