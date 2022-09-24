package priv.together.back.repo;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import priv.together.back.entity.User;
@Repository
public interface userRepository extends CrudRepository <User,Long> {
    User findByUsernameAndPassword(String username,String password);

}
