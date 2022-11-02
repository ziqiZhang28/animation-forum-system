package priv.together.back.entity;

import javax.persistence.Column;
import javax.persistence.Id;

public class CommentVo {
    int comment_id;

    String content;

    Long user_id;

    int forum_id;

    int root_comment_id;

    int to_comment_id;

    String nickname;

    String time;

    String userface;

    String comment_nickname;

    public String getComment_nickname() {
        return comment_nickname;
    }

    public void setComment_nickname(String comment_nickname) {
        this.comment_nickname = comment_nickname;
    }

    public CommentVo(int comment_id, String content, Long user_id, int forum_id, int root_comment_id, int to_comment_id, String nickname, String time, String userface, String comment_nickname) {
        this.comment_id = comment_id;
        this.content = content;
        this.user_id = user_id;
        this.forum_id = forum_id;
        this.root_comment_id = root_comment_id;
        this.to_comment_id = to_comment_id;
        this.nickname = nickname;
        this.time = time;
        this.userface = userface;
        this.comment_nickname=comment_nickname;
    }

    public String getUserface() {
        return userface;
    }

    public void setUserface(String userface) {
        this.userface = userface;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public int getComment_id() {
        return comment_id;
    }

    public void setComment_id(int comment_id) {
        this.comment_id = comment_id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public int getForum_id() {
        return forum_id;
    }

    public void setForum_id(int forum_id) {
        this.forum_id = forum_id;
    }

    public int getRoot_comment_id() {
        return root_comment_id;
    }

    public void setRoot_comment_id(int root_comment_id) {
        this.root_comment_id = root_comment_id;
    }

    public int getTo_comment_id() {
        return to_comment_id;
    }

    public void setTo_comment_id(int to_comment_id) {
        this.to_comment_id = to_comment_id;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
}
