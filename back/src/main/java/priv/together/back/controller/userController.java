package priv.together.back.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import priv.together.back.entity.Forum;
import priv.together.back.entity.User;
import priv.together.back.service.collectsService;
import priv.together.back.service.likesService;
import priv.together.back.service.userService;

import java.util.List;

@RestController
@RequestMapping("/user")
public class userController {
    @Autowired
    userService userService;
    @Autowired
    likesService likesService;
    @Autowired
    collectsService collectsService;

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

    @GetMapping("/getUserLikes")
    @Operation(summary = "用户的喜欢列表",parameters = {
            @Parameter(name = "user_id",in=ParameterIn.QUERY,example = "2")
    })
    List<Forum> getLikesOfUser(@RequestParam("user_id") Long user_id){
        return likesService.getAllLikes(user_id);
    }

    @GetMapping("/getUserCollects")
    @Operation(summary = "用户的收藏列表",parameters = {
            @Parameter(name = "user_id",in=ParameterIn.QUERY,example = "2")
    })
    List<Forum> getCollectsOfUser(@RequestParam("user_id") Long user_id){
        return collectsService.getAllCollects(user_id);
    }

}
