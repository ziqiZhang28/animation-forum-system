package priv.together.back.entity;


import java.util.Date;

public class ForumSimplify {
    int forum_id;

    String title;

    String content;

    int classify_id;

    int collects;

    int likes;

    Long user_id;

    String create_time;

    public ForumSimplify(int forum_id, String title, String content, int classify_id, int collects, int likes, Long user_id, String create_time) {
        this.forum_id = forum_id;
        this.title = title;
        this.content = content;
        this.classify_id = classify_id;
        this.collects = collects;
        this.likes = likes;
        this.user_id = user_id;
        this.create_time = create_time;
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

    public int getCollects() {
        return collects;
    }

    public void setCollects(int collects) {
        this.collects = collects;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public String getCreate_time() {
        return create_time;
    }

    public void setCreate_time(String create_time) {
        this.create_time = create_time;
    }
}
