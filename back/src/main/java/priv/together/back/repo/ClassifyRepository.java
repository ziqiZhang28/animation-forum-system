package priv.together.back.repo;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import priv.together.back.entity.Classify;

@Repository
public interface ClassifyRepository extends CrudRepository<Classify,Integer> {
    @Transactional
    @Modifying
    @Query(value = "insert into Classify(title,description) values (?1,?2)",nativeQuery = true)
    void addNewClassify(String title,String description);

    @Transactional
    @Modifying
    @Query(value = "update Classify set title=?1 where classify_id=?2")
    void modifyClassifyName(String title,int classify_id);

    @Transactional
    @Modifying
    @Query(value = "delete from Classify where classify_id=?1",nativeQuery = true)
    void deleteByClassify_id(int classify_id);
}
