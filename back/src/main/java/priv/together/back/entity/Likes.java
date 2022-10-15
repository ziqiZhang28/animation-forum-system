package priv.together.back.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Likes {
    @Id
    int id;

    @Column
    Long user_id;

    @Column
    int forum_id;

    public Likes() {
    }

    public Likes(int id, Long user_id, int forum_id) {
        this.id = id;
        this.user_id = user_id;
        this.forum_id = forum_id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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
}
