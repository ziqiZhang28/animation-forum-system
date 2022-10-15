package priv.together.back.repo;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;
import priv.together.back.entity.Collects;
import priv.together.back.entity.Likes;

import java.util.List;

public interface collectsRepository extends CrudRepository<Collects,Integer> {
    @Query(value = "select co from Collects co where co.user_id=?1")
    List<Collects> findAllByUser_id(Long user_id);

    @Transactional
    @Modifying
    @Query(value = "insert into Collects(user_id,forum_id) values (?1,?2)",nativeQuery = true)
    void collectOneForum(Long user_id,int forum_id);

    @Transactional
    @Modifying
    @Query(value = "delete from Collects where user_id=?1 and forum_id=?2",nativeQuery = true)
    void disCollectOneForum(Long user_id,int forum_id);
}
