package priv.together.back.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Comment {
    @Id
    int comment_id;

    @Column
    String content;

    @Column
    Long user_id;

    @Column
    int forum_id;

    @Column
    int root_comment_id;

    @Column
    int to_comment_id;

    @Column
    Date time;

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public Comment() {
    }

    public Comment(int comment_id, String content, Long user_id, int forum_id, int root_comment_id, int to_comment_id) {
        this.comment_id = comment_id;
        this.content = content;
        this.user_id = user_id;
        this.forum_id = forum_id;
        this.root_comment_id = root_comment_id;
        this.to_comment_id = to_comment_id;
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
}
