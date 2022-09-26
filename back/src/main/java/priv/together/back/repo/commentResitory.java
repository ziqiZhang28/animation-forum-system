package priv.together.back.repo;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import priv.together.back.entity.Comment;

@Repository
public interface commentResitory extends CrudRepository<Comment,Integer> {
    @Transactional
    @Modifying
    @Query(value = "insert into Comment(content,user_id,forum_id) values ( ?1,?2,?3 )",nativeQuery = true)
    void addNewCommentToForum(String content,Long user_id,int forum_id);

    @Query(value = "select c from Comment c where c.forum_id=?1")
    Iterable<Comment> getCommentByForum_id(int forum_id);
}
