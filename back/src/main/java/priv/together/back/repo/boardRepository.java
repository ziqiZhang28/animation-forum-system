package priv.together.back.repo;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;
import priv.together.back.entity.Board;

public interface boardRepository extends CrudRepository<Board,Integer> {
    @Transactional
    @Modifying
    @Query(value = "insert into Board(content) values ( ?1 )",nativeQuery = true)
    void addNewBoard(String content);
}
