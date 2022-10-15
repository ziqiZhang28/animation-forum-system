package priv.together.back.repo;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import priv.together.back.entity.Likes;

import java.util.List;

@Repository
public interface likesRepository extends CrudRepository<Likes,Integer> {
   @Query(value = "select li from Likes li where li.user_id=?1")
   List<Likes> findAllByUser_id(Long user_id);

   @Transactional
   @Modifying
   @Query(value = "insert into Likes(user_id,forum_id) values (?1,?2)",nativeQuery = true)
   void likeOneForum(Long user_id,int forum_id);

   @Transactional
   @Modifying
   @Query(value = "delete from Likes where user_id=?1 and forum_id=?2",nativeQuery = true)
   void dislikeOneForum(Long user_id,int forum_id);
}
