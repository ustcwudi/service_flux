package edu.hubu.core.api;

import edu.hubu.core.base.BaseMongoDao;
import edu.hubu.core.base.Result;
import edu.hubu.core.model.User;
import edu.hubu.core.request.query.UserQuery;
import edu.hubu.core.service.RedisService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.ResponseCookie;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;

@RestController
@RequestMapping("/api/user")
@Api(tags = "用户")
public class UserController {

    @Autowired
    private BaseMongoDao<User, UserQuery> userMongoDao;

    @Autowired
    private RedisService redisService;

    @Data
    static class LoginForm {
        @NotEmpty(message = "用户名不能为空")
        private String account;
        private String password;
        private String random;
        private String captcha;
    }

    @PostMapping("login")
    @ApiOperation("登录")
    public Mono<Result> login(@Valid @RequestBody Mono<LoginForm> form, @ApiIgnore ServerWebExchange exchange, @RequestHeader(value = "link", required = false) String link) {
        return form.flatMap(
                body -> redisService.get("captcha:" + body.getRandom()).flatMap(
                        value -> {
                            if (value.equals(body.getCaptcha())) {
                                Query query = new Query().addCriteria(Criteria.where("account").is(body.getAccount()))
                                        .addCriteria(Criteria.where("password").is(body.getPassword()));
                                String[] links = link == null ? new String[]{} : link.split(",");
                                Mono<User> userMono = userMongoDao.findOne(query, links);
                                return userMono.flatMap(user -> {
                                    ResponseCookie responseCookie = ResponseCookie.from("session", user.getId()).path("/").build();
                                    exchange.getResponse().addCookie(responseCookie);
                                    return redisService.setObject("session:" + user.getId(), user, 60 * 60 * 8)
                                            .thenReturn(Result.builder().data(user).message("登录成功").success(true).build());
                                }).switchIfEmpty(Result.fail(Mono.empty(), "用户名或密码错误"));
                            } else {
                                return Result.fail(Mono.empty(), "验证码不正确");
                            }
                        }
                ).switchIfEmpty(Result.fail(Mono.empty(), "验证码过期")));
    }

    @GetMapping("info")
    @ApiOperation("个人信息")
    public Mono<Result> login(@ApiIgnore ServerWebExchange exchange, @ApiIgnore User user) {
        return Result.ok(Mono.just(user));
    }
}
