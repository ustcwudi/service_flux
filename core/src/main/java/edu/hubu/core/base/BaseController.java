package edu.hubu.core.base;

import edu.hubu.core.model.User;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
import springfox.documentation.annotations.ApiIgnore;

import java.util.Collection;

public abstract class BaseController<T extends BaseModel, Q extends BaseQuery> {
    @Autowired
    protected BaseMongoDao<T, Q> mongoDao;

    protected final int defaultPageSize = 10;

    @PostMapping()
    @ApiOperation("新增")
    public Mono<Result> add(@ApiIgnore ServerWebExchange exchange, @ApiIgnore User user, @RequestBody T t) {
        return Result.ok(mongoDao.add(t));
    }

    @PostMapping("/multi")
    @ApiOperation("批量新增")
    public Mono<Result> add(@ApiIgnore ServerWebExchange exchange, @ApiIgnore User user, @RequestBody Collection<T> collection) {
        return Result.ok(mongoDao.add(collection));
    }

    @GetMapping("/id/{id}")
    @ApiOperation("根据ID获取")
    public Mono<Result> get(@ApiIgnore ServerWebExchange exchange, @ApiIgnore User user, @PathVariable String id, @RequestHeader(value = "link", required = false) String link) {
        String[] links = link == null ? new String[]{} : link.split(",");
        return Result.ok(mongoDao.findOne(id, links));
    }

    @PutMapping("/id/{id}")
    @ApiOperation("根据ID修改")
    public Mono<Result> update(@ApiIgnore ServerWebExchange exchange, @ApiIgnore User user, @PathVariable String id, @RequestBody T t) {
        return Result.ok(mongoDao.updateOne(id, t));
    }

    @PostMapping("/count")
    @ApiOperation("统计")
    public Mono<Result> count(@ApiIgnore ServerWebExchange exchange, @ApiIgnore User user, @RequestBody Q q) {
        return Result.ok(mongoDao.count(q));
    }

    @PutMapping("/trash")
    @ApiOperation("废弃")
    public Mono<Result> trash(@ApiIgnore ServerWebExchange exchange, @ApiIgnore User user, @RequestBody Q q) {
        return Result.ok(mongoDao.trash(q));
    }

    @PutMapping("/restore")
    @ApiOperation("还原")
    public Mono<Result> restore(@ApiIgnore ServerWebExchange exchange, @ApiIgnore User user, @RequestBody Q q) {
        return Result.ok(mongoDao.restore(q));
    }

    @PostMapping("/query")
    @ApiOperation("查询")
    public Mono<Result> query(@ApiIgnore ServerWebExchange exchange, @ApiIgnore User user, @RequestBody Q q, @RequestHeader(value = "link", required = false) String link) {
        String[] links = link == null ? new String[]{} : link.split(",");
        return Result.ok(mongoDao.find(q, links));
    }

    @PostMapping("query/{page}/{pageSize}")
    @ApiOperation("分页查询")
    public Mono<Result> query(@ApiIgnore ServerWebExchange exchange, @ApiIgnore User user, @RequestBody Q q, @RequestHeader(value = "link", required = false) String link, @PathVariable int page, @PathVariable int pageSize) {
        page = page < 0 ? 0 : page;
        pageSize = pageSize < 1 || pageSize > 100 ? defaultPageSize : pageSize;
        String[] links = link == null ? new String[]{} : link.split(",");
        return Result.ok(mongoDao.find(q, links, page, pageSize));
    }

    @PostMapping("query/{sort}/{direction}/{pageSize}/{page}")
    @ApiOperation("分页排序查询")
    public Mono<Result> query(@ApiIgnore ServerWebExchange exchange, @ApiIgnore User user, @RequestBody Q q, @RequestHeader(value = "link", required = false) String link, @PathVariable int page, @PathVariable int pageSize, @PathVariable String sort, @PathVariable String direction) {
        page = page < 0 ? 0 : page;
        pageSize = pageSize < 1 || pageSize > 100 ? defaultPageSize : pageSize;
        String[] links = link == null ? new String[]{} : link.split(",");
        return Result.ok(mongoDao.find(q, links, page, pageSize, sort, direction.equals("asc")));
    }

    @DeleteMapping()
    @ApiOperation("删除")
    public Mono<Result> delete(@ApiIgnore ServerWebExchange exchange, @ApiIgnore User user, @RequestBody Q q) {
        return Result.ok(mongoDao.delete(q));
    }

    @PutMapping()
    @ApiOperation("修改")
    public Mono<Result> update(@ApiIgnore ServerWebExchange exchange, @ApiIgnore User user, @RequestBody UpdateRequest<T, Q> r) {
        return Result.ok(mongoDao.update(r.getWhere(), r.getUpdate()));
    }
}
