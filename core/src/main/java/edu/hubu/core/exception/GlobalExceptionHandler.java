package edu.hubu.core.exception;

import edu.hubu.core.base.Result;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.support.WebExchangeBindException;
import reactor.core.publisher.Mono;

@ControllerAdvice(basePackages = "edu.hubu")
public class GlobalExceptionHandler {

    @ResponseBody
    @ExceptionHandler(value = WebExchangeBindException.class)
    public Mono<Result> serverWebInputExceptionHandler(WebExchangeBindException e) {
        return Result.fail(Mono.empty(), e.getFieldError().getDefaultMessage());
    }

    @ResponseBody
    @ExceptionHandler(value = Exception.class)
    public Mono<Result> exceptionHandler(Exception e) {
        return Result.fail(Mono.empty(), e.getMessage());
    }
}
