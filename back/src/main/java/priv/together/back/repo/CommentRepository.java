package priv.together.back.repo;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import priv.together.back.entity.Comment;

import java.util.List;

@Repository
public interface CommentRepository extends CrudRepository<Comment,Integer> {
    @Transactional
    @Modifying
    @Query(value = "insert into Comment(content,user_id,forum_id) values ( ?1,?2,?3 )",nativeQuery = true)
    void addNewCommentToForum(String content,Long user_id,int forum_id);

    @Query(value = "select c from Comment c where c.forum_id=?1 and c.root_comment_id=0 order by c.time desc")
    List<Comment> getRootCommentByForum_id(int forum_id);

    @Query(value = "select c from Comment c where c.forum_id=?1 and c.root_comment_id=?2 order by c.time desc")
    List<Comment> getCommentByForum_idAndRoot_comment_id(int forum_id,int root_comment_id);

    @Transactional
    @Modifying
    @Query(value = "insert into Comment(content,user_id,forum_id,root_comment_id,to_comment_id) values ( ?1,?2,?3,?4,0)",nativeQuery = true)
    void addReplyToComment(String content,Long user_id,int forum_id,int root_comment_id);

    @Transactional
    @Modifying
    @Query(value = "insert into Comment(content,user_id,forum_id,root_comment_id,to_comment_id) values ( ?1,?2,?3,?4,?5)",nativeQuery = true)
    void addReplyToComment(String content,Long user_id,int forum_id,int root_comment_id,int to_comment_id);

    @Transactional
    @Modifying
    @Query(value = "delete from Comment  where root_comment_id=?1",nativeQuery = true)
    void deleteByRoot_comment_id(int root_comment_id);

    @Transactional
    @Modifying
    @Query(value = "delete from Comment  where forum_id=?1",nativeQuery = true)
    void deleteByForum_id(int forum_id);

    @Query(value = "select c from Comment c where c.comment_id=?1")
    Comment getCommentByComment_id(int comment_id);
}
