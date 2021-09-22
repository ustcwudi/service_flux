package edu.hubu.core.filter;

import edu.hubu.core.base.Result;
import edu.hubu.core.model.User;
import edu.hubu.core.service.RedisService;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpCookie;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;


@Aspect
@Component
public class SecurityAspect {
    @Autowired
    private RedisService redisService;

    @Pointcut("execution(public * edu.hubu..*Controller.*(..))")
    public void security() {
    }

    @Around("security()")
    public Mono around(ProceedingJoinPoint joinPoint) throws Throwable {
        var arguments = joinPoint.getArgs();
        HttpCookie session = null;
        for (int i = 0; i < arguments.length; i++) {
            var argument = arguments[i];
            if (argument instanceof ServerWebExchange) {
                session = ((ServerWebExchange) argument).getRequest().getCookies().getFirst("session");
            } else if (argument instanceof User) {
                if (session != null) {
                    int index = i;
                    return redisService.getObject(session.getName() + ":" + session.getValue()).flatMap(value -> {
                        arguments[index] = value;
                        try {
                            return (Mono) joinPoint.proceed(arguments);
                        } catch (Throwable e) {
                            e.printStackTrace();
                            return Result.fail(Mono.empty(), e.getMessage());
                        }
                    }).switchIfEmpty(Result.fail(Mono.empty(), "用户未登录"));
                }
                return Result.fail(Mono.empty(), "用户未登录");
            }
        }
        return (Mono) joinPoint.proceed();
    }
}
