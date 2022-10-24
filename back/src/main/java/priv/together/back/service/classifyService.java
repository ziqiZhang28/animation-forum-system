package priv.together.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import priv.together.back.entity.Classify;
import priv.together.back.repo.ClassifyRepository;

import java.util.Optional;

@Service
public class classifyService {
    @Autowired
    ClassifyRepository classifyResitory;

    public void addClassify(String title,String description){
        classifyResitory.addNewClassify(title,description);
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

    public Optional<Classify> getClassifyById(int classify_id){
        return classifyResitory.findById(classify_id);
    }
}
