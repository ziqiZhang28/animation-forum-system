package priv.together.back.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import priv.together.back.entity.Comment;

@Repository
public interface commentResitory extends CrudRepository<Comment,Integer> {
}
