package priv.together.back.repo;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import priv.together.back.entity.Likes;

import java.util.List;

@Repository
public interface likesRepository extends CrudRepository<Likes,Integer> {
   @Query(value = "select li from Likes li where li.user_id=?1")
   List<Likes> findAllByUser_id(Long user_id);
}
