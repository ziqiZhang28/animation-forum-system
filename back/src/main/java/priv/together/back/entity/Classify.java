package priv.together.back.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Classify {
    @Id
    int classify_id;

    @Column
    String title;

    @Column
    String description;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Classify() {
    }

    public Classify(int classify_id, String title,String description) {
        this.classify_id = classify_id;
        this.title = title;
        this.description=description;
    }

    public int getClassify_id() {
        return classify_id;
    }

    public void setClassify_id(int classify_id) {
        this.classify_id = classify_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String name) {
        this.title = name;
    }
}
