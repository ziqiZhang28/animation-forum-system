package priv.togrther.back.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Classify {
    @Id
    int classify_id;

    @Column
    String name;

    public Classify() {
    }

    public Classify(int classify_id, String name) {
        this.classify_id = classify_id;
        this.name = name;
    }

    public int getClassify_id() {
        return classify_id;
    }

    public void setClassify_id(int classify_id) {
        this.classify_id = classify_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
