package priv.together.back.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import priv.together.back.entity.Classify;

@Repository
public interface classifyResitory extends CrudRepository<Classify,Integer> {
}
