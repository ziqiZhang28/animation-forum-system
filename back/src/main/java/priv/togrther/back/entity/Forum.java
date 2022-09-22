package priv.togrther.back.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Forum {
    @Id
    int forum_id;

    @Column
    String title;

    @Column
    String content;

    @Column
    int classify_id;

    @Column
    int collects;

    @Column
    int likes;

    public Forum() {
    }

    public Forum(int forum_id, String title, String content, int classify_id, int collects, int likes) {
        this.forum_id = forum_id;
        this.title = title;
        this.content = content;
        this.classify_id = classify_id;
        this.collects = collects;
        this.likes = likes;
    }

    public int getForum_id() {
        return forum_id;
    }

    public void setForum_id(int forum_id) {
        this.forum_id = forum_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getClassify_id() {
        return classify_id;
    }

    public void setClassify_id(int classify_id) {
        this.classify_id = classify_id;
    }
}
