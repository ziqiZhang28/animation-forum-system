package priv.together.back.repo;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import priv.together.back.entity.Forum;

import java.util.List;

@Repository
public interface forumRepository extends CrudRepository<Forum,Integer> {

    @Query("select f from Forum f where f.likes+f.collects >=100")
    List<Forum> findTopForums();


}
