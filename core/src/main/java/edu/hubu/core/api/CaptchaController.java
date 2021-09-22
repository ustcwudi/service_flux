package edu.hubu.core.api;

import com.google.code.kaptcha.impl.DefaultKaptcha;
import com.google.code.kaptcha.util.Config;
import edu.hubu.core.service.RedisService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.core.io.buffer.DefaultDataBufferFactory;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Controller;
import org.springframework.util.FastByteArrayOutputStream;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import reactor.core.publisher.Mono;
import springfox.documentation.annotations.ApiIgnore;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.util.Properties;
import java.util.UUID;

@Controller
@RequestMapping("/api/captcha")
@Api(tags = "验证码")
public class CaptchaController {

    @Autowired
    private RedisService redis;

    private final DefaultKaptcha defaultKaptcha = new DefaultKaptcha();

    public CaptchaController() {
        Properties properties = new Properties();
        properties.put("kaptcha.background.impl", "edu.hubu.core.config.TranslucentBackground");
        properties.put("kaptcha.border", "no");
        Config config = new Config(properties);
        defaultKaptcha.setConfig(config);
    }

    @ApiOperation(value = "生成验证码")
    @GetMapping()
    public Mono<Void> handle(@ApiIgnore ServerHttpResponse response) throws java.io.IOException {
        // 生成验证码
        String captcha = defaultKaptcha.createText();
        BufferedImage image = defaultKaptcha.createImage(captcha);
        // 保存验证码信息
        String random = UUID.randomUUID().toString();
        // 转换流信息写出
        FastByteArrayOutputStream os = new FastByteArrayOutputStream();
        ImageIO.write(image, "png", os);
        response.getHeaders().set("random", random);
        return redis.set("captcha:" + random, captcha, 60).then(
                response.writeWith(DataBufferUtils.readInputStream(os::getInputStream, new DefaultDataBufferFactory(), 4096))
        );
    }
}
