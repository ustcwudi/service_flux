package edu.hubu.core.base;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ApiModel("结果")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Result {
    private Object data;
    private Boolean success;
    private String message;
    private Integer code;
    private Map<String, List<BaseModel>> map;

    public static <T> Mono<Result> ok(Mono<T> monoData) {
        return create(monoData, 0, null, true);
    }

    public static <T> Mono<Result> ok(Mono<T> monoData, String message) {
        return create(monoData, 0, message, true);
    }

    public static <T> Mono<Result> ok(Mono<T> monoData, int code, String message) {
        return create(monoData, code, message, true);
    }

    public static <T> Mono<Result> fail(Mono<T> monoData) {
        return create(monoData, -1, null, false);
    }

    public static <T> Mono<Result> fail(Mono<T> monoData, String message) {
        return create(monoData, -1, message, false);
    }

    public static <T> Mono<Result> fail(Mono<T> monoData, int code, String message) {
        return create(monoData, code, message, false);
    }

    public static <T> Mono<Result> ok(Flux<T> fluxData) {
        return create(fluxData, 0, null, true);
    }

    public static <T> Mono<Result> ok(Flux<T> fluxData, String message) {
        return create(fluxData, 0, message, true);
    }

    public static <T> Mono<Result> ok(Flux<T> fluxData, int code, String message) {
        return create(fluxData, code, message, true);
    }

    public static <T> Mono<Result> fail(Flux<T> fluxData) {
        return create(fluxData, -1, null, false);
    }

    public static <T> Mono<Result> fail(Flux<T> fluxData, String message) {
        return create(fluxData, -1, message, false);
    }

    public static <T> Mono<Result> fail(Flux<T> fluxData, int code, String message) {
        return create(fluxData, code, message, false);
    }

    public static <T> Mono<Result> ok(Mono<T> monoData, HandleEmpty handler) {
        return create(monoData, 0, null, true, handler);
    }

    public static <T> Mono<Result> ok(Mono<T> monoData, String message, HandleEmpty handler) {
        return create(monoData, 0, message, true, handler);
    }

    public static <T> Mono<Result> ok(Mono<T> monoData, int code, String message, HandleEmpty handler) {
        return create(monoData, code, message, true, handler);
    }

    public static <T> Mono<Result> fail(Mono<T> monoData, HandleEmpty handler) {
        return create(monoData, -1, null, false, handler);
    }

    public static <T> Mono<Result> fail(Mono<T> monoData, String message, HandleEmpty handler) {
        return create(monoData, -1, message, false, handler);
    }

    public static <T> Mono<Result> fail(Mono<T> monoData, int code, String message, HandleEmpty handler) {
        return create(monoData, code, message, false, handler);
    }

    public static <T> Mono<Result> ok(Flux<T> fluxData, HandleEmpty handler) {
        return create(fluxData, 0, null, true, handler);
    }

    public static <T> Mono<Result> ok(Flux<T> fluxData, String message, HandleEmpty handler) {
        return create(fluxData, 0, message, true, handler);
    }

    public static <T> Mono<Result> ok(Flux<T> fluxData, int code, String message, HandleEmpty handler) {
        return create(fluxData, code, message, true, handler);
    }

    public static <T> Mono<Result> fail(Flux<T> fluxData, HandleEmpty handler) {
        return create(fluxData, -1, null, false, handler);
    }

    public static <T> Mono<Result> fail(Flux<T> fluxData, String message, HandleEmpty handler) {
        return create(fluxData, -1, message, false, handler);
    }

    public static <T> Mono<Result> fail(Flux<T> fluxData, int code, String message, HandleEmpty handler) {
        return create(fluxData, code, message, false, handler);
    }

    @FunctionalInterface
    public interface HandleEmpty {
        Mono<Result> handle();
    }

    private static <T> Mono<Result> create(Mono<T> monoData, int code, String message, Boolean success) {
        return monoData.map(data -> Result.builder().data(data).code(code).message(message).success(success).build())
                .switchIfEmpty(Mono.just(Result.builder().code(code).message(message).success(success).build()));
    }

    private static <T> Mono<Result> create(Flux<T> fluxData, int code, String message, Boolean success) {
        return fluxData.collectList().map(data -> Result.builder().data(data).code(code).message(message).success(success).build())
                .switchIfEmpty(Mono.just(Result.builder().code(code).message(message).success(success).build()));
    }

    private static <T> Mono<Result> create(Mono<T> monoData, int code, String message, Boolean success, HandleEmpty handler) {
        return monoData.map(data -> Result.builder().data(data).code(code).message(message).success(success).build()).switchIfEmpty(handler.handle())
                .switchIfEmpty(Mono.just(Result.builder().code(code).message(message).success(success).build()));
    }

    private static <T> Mono<Result> create(Flux<T> fluxData, int code, String message, Boolean success, HandleEmpty handler) {
        return fluxData.collectList().map(data -> Result.builder().data(data).code(code).message(message).success(success).build()).switchIfEmpty(handler.handle())
                .switchIfEmpty(Mono.just(Result.builder().code(code).message(message).success(success).build()));
    }
}
