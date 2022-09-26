package priv.together.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import priv.together.back.entity.Classify;
import priv.together.back.repo.classifyResitory;

@Service
public class classifyService {
    @Autowired
    classifyResitory classifyResitory;

    public void addClassify(String name){
        classifyResitory.addNewClassify(name);
    }

    public Iterable<Classify> getClassify(){
        return classifyResitory.findAll();
    }

    public void modifyClassify(String name,int classify_id){
        classifyResitory.modifyClassifyName(name,classify_id);
    }

    public void deleteClassify(int classify_id){
        classifyResitory.deleteById(classify_id);
    }
}
