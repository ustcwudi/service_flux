package edu.hubu.${module}.controller;

import edu.hubu.core.base.BaseController;
import edu.hubu.core.service.FileService;
import edu.hubu.core.base.Result;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.server.ServerWebExchange;
import springfox.documentation.annotations.ApiIgnore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import edu.hubu.${module}.model.*;
import edu.hubu.${module}.request.query.*;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.*;

@Slf4j
@RestController("${module}.${model.name}Controller")
@RequestMapping("/api/${u(model.name)}")
@Api(tags = "${model.description}")
public class ${model.name}Controller extends BaseController<${model.name}, ${model.name}Query> {

    @PostConstruct
    public void init() {
        mongoDao.count().subscribe(count -> {
            if (count == 0) {
                try {
                    var stream = getClass().getResourceAsStream("/data/${model.name}.csv");
                    if (stream != null) {
                        var list = new ArrayList<List<String>>();
                        String text = new String(stream.readAllBytes());
                        var lines = text.split("(\r\n|\r|\n)");
                        for (String line : lines) {
                            list.add(List.of(line.split(",")));
                        }
                        mongoDao.importMatrix(list).subscribe();
                    }
                } catch (IOException e) {
                    log.error(e.getMessage());
                }
            }
        });
    }

    @Autowired
    FileService fileService;
    <#list model.fields as field>
    <#if field.type == "upload">

    @PostMapping(value = "/file/${u(field.name)}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ApiOperation("上传${field.description}")
    public Mono<String> upload${field.name}(@ApiIgnore ServerWebExchange exchange, @ApiIgnore User user, @RequestPart("file") FilePart filePart) {
            return fileService.upload(filePart, "${u(model.name)}/${u(field.name)}/", filePart.filename());
    }

    @GetMapping("/file/${u(field.name)}/{fileName}")
    @ApiOperation("下载${field.description}")
    public Mono<Void> download${field.name}(@ApiIgnore ServerWebExchange exchange, @ApiIgnore User user, @PathVariable String fileName, @ApiIgnore ServerHttpResponse response) {
        return response.writeWith(fileService.download("${u(model.name)}/${u(field.name)}/", fileName));
    }
    </#if>
    </#list>

    @GetMapping("/distinct/{field}")
    @ApiOperation("分类")
    public Mono<Result> distinct(@ApiIgnore ServerWebExchange exchange, @ApiIgnore User user, @PathVariable String field) {
        switch (field) {
        <#list model.fields as field>
            <#if field.type == "string">
            case "${c(field.name)}":
                return Result.ok(mongoDao.distinctString(field));
            <#elseif field.type == "float">
            case "${c(field.name)}":
                return Result.ok(mongoDao.distinctFloat(field));
            <#elseif field.type == "int">
            case "${c(field.name)}":
                return Result.ok(mongoDao.distinctInteger(field));
            </#if>
        </#list>
        default:
            return Result.fail(Mono.just(new ArrayList<>()));
        }
    }

    @GetMapping()
    @ApiOperation("获取")
    public Mono<Result> get(
            @ApiIgnore ServerWebExchange exchange,
            @ApiIgnore User user,
            <#list model.fields as field><#assign type = qt(field.type, field.search)><#if type == "String" || type == "Float" || type == "Integer" >
            @RequestParam(required = false) ${type} ${c(field.name)},
            </#if></#list>
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer pageSize,
            @RequestParam(required = false) String link
    ) {
        ${model.name}Query query = new ${model.name}Query();
        <#list model.fields as field><#assign type = qt(field.type, field.search)><#if type == "String" || type == "Float" || type == "Integer">
        if (${c(field.name)} != null)
            query.set${field.name}(${c(field.name)});
        </#if></#list>
        if (page == null && pageSize == null) {
            String[] links = link == null ? new String[]{} : link.split(",");
            return Result.ok(mongoDao.find(query, links));
        } else {
            page = page == null || page < 0 ? 0 : page;
            pageSize = pageSize == null || pageSize < 1 || pageSize > 100 ? defaultPageSize : pageSize;
            String[] links = link == null ? new String[]{} : link.split(",");
            return Result.ok(mongoDao.find(query, links, page, pageSize));
        }
    }
}