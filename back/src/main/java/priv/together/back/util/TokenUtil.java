package priv.together.back.util;

import priv.together.back.entity.User;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

//设置并存储token，随机不重复
public class TokenUtil {
    private static Map<String, User> tokenMap=new HashMap<>();


    public static String generateToken(User user){
        String token= UUID.randomUUID().toString();
        tokenMap.put(token,user);
        return token;
    }

    public static boolean verify(String token){
        return tokenMap.containsKey(token);
    }

    public static User getUser(String token){
        return tokenMap.get(token);
    }
}
