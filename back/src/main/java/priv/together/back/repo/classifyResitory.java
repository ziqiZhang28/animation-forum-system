package priv.together.back.repo;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import priv.together.back.entity.Classify;

@Repository
public interface classifyResitory extends CrudRepository<Classify,Integer> {
    @Transactional
    @Modifying
    @Query(value = "insert into Classify(name) values (?1)",nativeQuery = true)
    void addNewClassify(String name);

    @Transactional
    @Modifying
    @Query(value = "update Classify set name=?1 where classify_id=?2")
    void modifyClassifyName(String name,int classify_id);
}
