package priv.together.back.repo;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import priv.together.back.entity.Forum;

import java.util.Date;
import java.util.List;

@Repository
public interface forumRepository extends CrudRepository<Forum,Integer> {


    @Query(value = "select * from Forum  where likes+collects >=100 and classify_id=?1 order by likes+collects desc ",nativeQuery = true)
    List<Forum> findTopForums(int classify_id);

    @Query("select f from Forum f where f.likes+f.collects >=100 order by f.likes desc ")
    List<Forum> findHomeTopForums();

    List<Forum> findAll();

    @Query(value = "select f from Forum f where f.user_id=?1")
    List<Forum> findForumsByUser_id(Long user_id);

    @Transactional
    @Modifying
    @Query(value = "insert into Forum(title,content,classify_id,user_id,collects,likes) values(?1,?2,?3,?4,0,0)",nativeQuery = true)
    void newForum(String title,String content,int classify_id,Long user_id);

    @Transactional
    @Modifying
    @Query(value = "update Forum set title=?1 and content=?2 and classify_id=?3 where forum_id=?2",nativeQuery = true)
    void updateForum(String title,String content,int classify_id,int forum_id);

    @Transactional
    @Modifying
    @Query(value = "update Forum set likes=likes+1 where forum_id=?1",nativeQuery = true)
    void likeForum(int forum_id);

    @Transactional
    @Modifying
    @Query(value = "update Forum set collects=collects+1 where forum_id=?1",nativeQuery = true)
    void collectForum(int forum_id);

    @Transactional
    @Modifying
    @Query(value = "update Forum set likes=likes-1 where forum_id=?1",nativeQuery = true)
    void dislikeForum(int forum_id);

    @Transactional
    @Modifying
    @Query(value = "update Forum set collects=collects-1 where forum_id=?1",nativeQuery = true)
    void discollectForum(int forum_id);

    @Query(value = "select f from Forum f where f.forum_id=?1")
    Forum findByForum_id(int forum_id);

    @Transactional
    @Modifying
    @Query(value = "delete from Forum  where forum_id=?1",nativeQuery = true)
    void deleteByForum_id(int forum_id);
    @Transactional
    @Modifying
    @Query(value = "delete from Forum  where classify_id=?1",nativeQuery = true)
    void deleteByClassify_id(int classify_id);

    @Query(value = "select f from Forum f where f.classify_id=?1")
    List<Forum> findByClassify_id(int classify_id);


    @Query(value = "select * from Forum  where create_time >= unix_timestamp(?1) and classify_id=?2 order by create_time desc ",nativeQuery = true)
    List<Forum> findForumsByDateDes(String current_time,int classify_id);
    
    @Query(value = "select * from Forum  where INSTR(content,?1)",nativeQuery = true)
    List<Forum> findForumsByUniqWord(String key);

    @Query(value = "select * from Forum  order by create_time desc limit 0,1",nativeQuery = true)
    Forum findLastestForum();
}

