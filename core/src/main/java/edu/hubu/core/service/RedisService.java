package edu.hubu.core.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.data.redis.core.ReactiveStringRedisTemplate;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.time.Duration;

@Component
public class RedisService {

    @Autowired
    private ReactiveStringRedisTemplate redisTemplate;

    @Autowired
    private ReactiveRedisTemplate<Object, Object> objectRedisTemplate;

    public Mono<Boolean> set(String key, String value, int seconds) {
        return redisTemplate.opsForValue().set(key, value, Duration.ofSeconds(seconds));
    }

    public Mono<String> get(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    public Mono<Boolean> setObject(Object key, Object value, int seconds) {
        return objectRedisTemplate.opsForValue().set(key, value, Duration.ofSeconds(seconds));
    }

    public Mono<Object> getObject(Object key) {
        return objectRedisTemplate.opsForValue().get(key);
    }
}
