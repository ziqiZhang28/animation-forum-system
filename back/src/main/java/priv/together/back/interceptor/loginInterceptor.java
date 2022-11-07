/*
package priv.together.back.interceptor;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import priv.together.back.util.TokenUtil;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class loginInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,Object handler){
        System.out.println("preHnadle.....");
        String uri=request.getRequestURI();
        System.out.println("当前路径:"+uri);

        if(!(handler instanceof HandlerMethod )){
            return true;
        }
        String token=request.getHeader("qcby-token");

        if(!TokenUtil.verify(token)){
            return false;
        }else {
            return true;
        }
    }
}
*/
