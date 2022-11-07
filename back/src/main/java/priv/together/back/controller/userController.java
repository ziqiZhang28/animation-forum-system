package priv.together.back.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
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
import priv.together.back.util.TokenUtil;

import java.util.*;

@RestController
@CrossOrigin
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
    Map<String,Object> getAllUser(){
        Map<String,Object> map=new HashMap<>();
        map.put("code",1);
        map.put("data",userService.getAllUsers());
        return map;
    }

    @DeleteMapping("/deleteUser")
    @Operation(summary = "删除用户",parameters = {
            @Parameter(name = "user_id",in= ParameterIn.QUERY,example = "2"),
    })
    void deleteUser(@Parameter(hidden = true)@RequestParam("user_id")Long user_id){
        userService.deleteOneUser(user_id);
    }

/*    @PutMapping("/updateUser")
    @Operation(summary = "更新用户资料")
    void updateUser(@RequestBody User user){
        userService.updateOneUser(user.getNickname(),user.getEmail(),user.getUserface(),user.getUser_id());
    }*/

    @PutMapping("/updateUser")
    @Operation(summary = "更新用户资料",
    parameters = {@Parameter(name = "传一个user实体即可")})
    public Map<String,Object> updateUser(@RequestBody Map<String,Object> data){
        ObjectMapper objectMapper=new ObjectMapper();
        User user=objectMapper.convertValue(data.get("user"),User.class);
        userService.updateOneUser(user.getNickname(),user.getEmail(),user.getUserface(),user.getUser_id(),user.getDepiction());

        User update_user=userService.getUserByUser_id(user.getUser_id());

        Map<String,Object> map=new HashMap<>();
        Map<String,Object> map_return=new HashMap<>();

        String token= TokenUtil.generateToken(update_user);
        map.put("code",1);
        map.put("data",update_user);
        map.put("token",token);

        map_return.put("data",map);

        return map_return;
    }

    @GetMapping("/getUserLikes")
    @Operation(summary = "用户的喜欢列表",parameters = {
            @Parameter(name = "user_id",in=ParameterIn.QUERY,example = "2")
    })
    Map<String,Object> getLikesOfUser(@RequestParam("user_id") Long user_id){
        Map<String,Object> map=new HashMap<>();
        map.put("code",1);
        map.put("data",likesService.getAllLikes(user_id));
        return map;
    }

    @GetMapping("/getUserCollects")
    @Operation(summary = "用户的收藏列表",parameters = {
            @Parameter(name = "user_id",in=ParameterIn.QUERY,example = "2")
    })
    Map<String,Object> getCollectsOfUser(@RequestParam("user_id") Long user_id){
        Map<String,Object> map=new HashMap<>();
        map.put("code",1);
        map.put("data",collectsService.getAllCollects(user_id));
        return map;
    }

/*    @PutMapping("/like")
    @Operation(summary = "点赞",parameters = {
            @Parameter(name = "user_id",in=ParameterIn.QUERY,example = "2"),
            @Parameter(name = "forum_id",in=ParameterIn.QUERY,example = "2")
    })
    void likeOneForum(@RequestParam("user_id")Long user_id,@RequestParam("forum_id")int forum_id){
        likesService.likeOneForum(user_id,forum_id);
    }*/

    @PutMapping("/like")
    @Operation(summary = "点赞",parameters = {
            @Parameter(name = "user_id",in=ParameterIn.QUERY,example = "2"),
            @Parameter(name = "forum_id",in=ParameterIn.QUERY,example = "2")
    })
    public Map<String,Object> likeOneForum(@RequestBody Map<String,String> data){
        Map<String,Object> map=new HashMap<>();
        Map<String,Object> map_return=new HashMap<>();
        if(data.isEmpty()){
            map.put("code",0);
            map.put("msg","点赞失败！请重试！");
        }else {
            Long user_id=Long.parseLong(data.get("user_id"));
            int forum_id=Integer.parseInt(data.get("forum_id"));
            likesService.likeOneForum(user_id,forum_id);
            map.put("code",1);
            map.put("msg","您点赞了该贴！");
        }
        map_return.put("data",map);

        return map_return;
    }

/*    @PutMapping("/collect")
    @Operation(summary = "收藏",parameters = {
            @Parameter(name = "user_id",in=ParameterIn.QUERY,example = "2"),
            @Parameter(name = "forum_id",in=ParameterIn.QUERY,example = "2")
    })
    void collectOneForum(@RequestParam("user_id")Long user_id,@RequestParam("forum_id")int forum_id){
        collectsService.collectOneForum(user_id,forum_id);
    }*/

    @PutMapping("/collect")
    @Operation(summary = "收藏",parameters = {
            @Parameter(name = "user_id",in=ParameterIn.QUERY,example = "2"),
            @Parameter(name = "forum_id",in=ParameterIn.QUERY,example = "2")
    })
    public Map<String,Object> collectOneForum(@RequestBody Map<String,String> data){
        Map<String,Object> map=new HashMap<>();
        Map<String,Object> map_return=new HashMap<>();
        if(data.isEmpty()){
            map.put("code",0);
            map.put("msg","收藏失败！请重试！");
        }else {
            Long user_id=Long.parseLong(data.get("user_id"));
            int forum_id=Integer.parseInt(data.get("forum_id"));
            collectsService.collectOneForum(user_id,forum_id);
            map.put("code",1);
            map.put("msg","您收藏了该贴！");
        }
        map_return.put("data",map);

        return map_return;

    }

/*    @PutMapping("/dislike")
    @Operation(summary = "取消点赞",parameters = {
            @Parameter(name = "user_id",in=ParameterIn.QUERY,example = "2"),
            @Parameter(name = "forum_id",in=ParameterIn.QUERY,example = "2")
    })
    void dislikeOneForum(@RequestParam("user_id")Long user_id,@RequestParam("forum_id")int forum_id){
        likesService.dislikeOneForum(user_id, forum_id);
    }*/
    @PutMapping("/dislike")
    @Operation(summary = "取消点赞",parameters = {
            @Parameter(name = "user_id",in=ParameterIn.QUERY,example = "2"),
            @Parameter(name = "forum_id",in=ParameterIn.QUERY,example = "2")
    })
    public Map<String,String> dislikeOneForum(@RequestBody Map<String,String> data){
        Long user_id=Long.parseLong(data.get("user_id"));
        int forum_id=Integer.parseInt(data.get("forum_id"));
        likesService.dislikeOneForum(user_id, forum_id);;
        return data;
    }


/*    @PutMapping("/discollect")
    @Operation(summary = "取消收藏",parameters = {
            @Parameter(name = "user_id",in=ParameterIn.QUERY,example = "2"),
            @Parameter(name = "forum_id",in=ParameterIn.QUERY,example = "2")
    })
    void disCollectOneForum(@RequestParam("user_id")Long user_id,@RequestParam("forum_id")int forum_id){
        collectsService.disCollectOneForum(user_id, forum_id);
    }*/

    @PutMapping("/discollect")
    @Operation(summary = "取消收藏",parameters = {
            @Parameter(name = "user_id",in=ParameterIn.QUERY,example = "2"),
            @Parameter(name = "forum_id",in=ParameterIn.QUERY,example = "2")
    })
    public Map<String,String> disCollectOneForum(@RequestBody Map<String,String> data){
        Long user_id=Long.parseLong(data.get("user_id"));
        int forum_id=Integer.parseInt(data.get("forum_id"));
        collectsService.disCollectOneForum(user_id, forum_id);
        return data;
    }




    @GetMapping("/getOneUser")
    @Operation(summary = "得到某个用户",parameters = {
            @Parameter(name = "user_id",in=ParameterIn.QUERY,example = "2")
    })
    Map<String,Object> getOneUser(@RequestParam("user_id")Long user_id){
        Map<String,Object> map=new HashMap<>();
        map.put("code",1);
        map.put("data",userService.getOneUser(user_id));
        return  map;
    }

/*    @PutMapping("/updatePassword")
    @Operation(summary = "重置密码",parameters = {
            @Parameter(name = "user_id",in=ParameterIn.QUERY,example = "2"),
            @Parameter(name = "password",in=ParameterIn.QUERY,example = "456")
    })
    void updatePassword(@RequestParam("password")String password, @RequestParam("user_id")Long user_id){
        userService.updateUserPassword(password, user_id);
    }*/

    @PutMapping("/updatePassword")
    @Operation(summary = "重置密码",parameters = {
            @Parameter(name = "user_id",in=ParameterIn.QUERY,example = "2"),
            @Parameter(name = "password",in=ParameterIn.QUERY,example = "456")
    })
    public Map<String,String> updatePassword(@RequestBody Map<String,String> data){
        Long user_id=Long.parseLong(data.get("user_id"));
        String password=data.get("password");
        userService.updateUserPassword(password,user_id);
        return data;
    }


    @GetMapping("/getUserByToken")
    @Operation(summary = "通过Token得到用户",parameters = {
            @Parameter(name = "Token",in=ParameterIn.QUERY)
    })
    Map<String,Object> getUserByToken(String Token){
        Map<String,Object> map=new HashMap<>();
        map.put("code",1);
        map.put("data",TokenUtil.getUser(Token));
        return  map;
    }


}
