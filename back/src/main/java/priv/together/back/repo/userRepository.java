package priv.together.back.repo;


import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import priv.together.back.entity.User;

import java.util.List;

@Repository
public interface userRepository extends CrudRepository <User,Long> {

    User findByUsername(String username);

    @Transactional
    @Modifying
    @Query(value = "insert into User(username,password,nickname,email,userface,enabled) values (?1,?2,?3,?4,?5,2)",nativeQuery = true)
    void addOneUser(String username,String password,String nickname,String email,String userface);


    @Transactional
    @Modifying
    @Query(value = "update User set nickname=?1,email=?2,userface=?3 where user_id=?4")
    void updateUser(String nickname,String email,String userface,Long user_id);

    @Transactional
    @Modifying
    @Query(value = "update User set password=?1 where user_id=?2")
    void updatePassword(String password,Long user_id);

    @Query(value = "select nickname from User where user_id=?1")
    String getNicknameByUser_id(Long user_id);

}
