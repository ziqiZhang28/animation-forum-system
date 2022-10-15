package priv.together.back.repo;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import priv.together.back.entity.Collects;
import priv.together.back.entity.Likes;

import java.util.List;

public interface collectsRepository extends CrudRepository<Collects,Integer> {
    @Query(value = "select co from Collects co where co.user_id=?1")
    List<Collects> findAllByUser_id(Long user_id);
}
