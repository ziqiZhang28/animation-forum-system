package priv.together.back.util;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import priv.together.back.entity.User;

@SpringBootTest
class TokenUtilTest {


    User user=new User(1L,"123","123","123","3","123@qq.com","34");
    String token=TokenUtil.generateToken(user);
    @BeforeEach
    void setUp() {
        System.out.println("测试开始");
    }

    @AfterEach
    void tearDown() {
        System.out.println("测试结束");
    }

    @Test
    void generateToken() {
        System.out.println("生成的token: "+token);
    }

    @Test
    void verify() {
        System.out.println("验证是否含有token:"+TokenUtil.verify(token));
    }

    @Test
    void getUser() {
        if(TokenUtil.getUser(token)!=null){
            System.out.println("用户不为空!");
        }else{
            System.out.println("不存在该用户与其匹配的Token!");
        }
    }
}