package priv.togrther.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import priv.togrther.back.entity.Forum;
import priv.togrther.back.service.forumService;


import java.util.List;

@RestController
@RequestMapping("/api")
public class homeController {

    @Autowired
    forumService forum_service;

    @GetMapping("/getHomeForums")
    List<Forum> getHomeForums(){
        return forum_service.getTopForums();
    }
}
