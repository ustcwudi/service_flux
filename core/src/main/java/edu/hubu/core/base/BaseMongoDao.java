package edu.hubu.core.base;

import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.lang.reflect.ParameterizedType;
import java.util.Collection;
import java.util.Date;
import java.util.List;

public abstract class BaseMongoDao<T extends BaseModel, Q extends BaseQuery> {

    @SuppressWarnings("unchecked")
    private final Class<T> clazz = (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass())
            .getActualTypeArguments()[0];

    @Autowired
    protected BaseRequestBuilder<T, Q> requestBuilder;

    @Autowired
    protected ReactiveMongoTemplate reactiveMongoTemplate;

    public Flux<T> importMatrix(List<List<String>> matrix) {
        return Flux.empty();
    }

    public Flux<T> distinct(String field, Class<T> resultClass) {
        return reactiveMongoTemplate.findDistinct(field, clazz, resultClass);
    }

    public Mono<T> findOne(String id, String[] links) {
        return findOne(new Query().addCriteria(Criteria.where("id").is(id)), links);
    }

    public Mono<T> findOne(Query query, String[] links) {
        var result = reactiveMongoTemplate.findOne(query, clazz).map(List::of);
        for (String link : links) {
            result = link(link, result);
        }
        return result.map(list -> list.get(0));
    }

    public Mono<List<T>> find(String[] links) {
        return find(new Query(), links);
    }

    public Mono<List<T>> find(Collection<String> idList, String[] links) {
        return find(new Query().addCriteria(Criteria.where("id").in(idList)), links);
    }

    public Mono<List<T>> find(Q q, String[] links) {
        return find(requestBuilder.buildQuery(q), links);
    }

    public Mono<List<T>> find(Q q, String[] links, int page, int pageSize) {
        return find(requestBuilder.buildQuery(q).limit(pageSize).skip(pageSize * (page - 1L)).with(Sort.by(Sort.Direction.DESC, "id")), links);
    }

    public Mono<List<T>> find(Q q, String[] links, int page, int pageSize, String sort, boolean direction) {
        return find(requestBuilder.buildQuery(q).limit(pageSize).skip(pageSize * (page - 1L)).with(Sort.by(direction ? Sort.Direction.ASC : Sort.Direction.DESC, sort)), links);
    }

    public Mono<List<T>> find(Query query, String[] links) {
        var result = reactiveMongoTemplate.find(query, clazz).collectList();
        for (String link : links) {
            result = link(link, result);
        }
        return result;
    }

    public Mono<Long> count() {
        return count(new Query());
    }

    public Mono<Long> count(Q q) {
        return count(requestBuilder.buildQuery(q));
    }

    public Mono<Long> count(Query query) {
        return reactiveMongoTemplate.count(query, clazz);
    }

    public Mono<Long> updateOne(String id, T t) {
        return updateOne(new Query().addCriteria(Criteria.where("id").is(id)), t);
    }

    public Mono<Long> updateOne(Q q, T t) {
        return updateOne(requestBuilder.buildQuery(q), t);
    }

    public Mono<Long> updateOne(Query query, T t) {
        return reactiveMongoTemplate.updateFirst(query, requestBuilder.buildUpdate(t), clazz).map(UpdateResult::getModifiedCount);
    }

    public Mono<Long> update(Q q, T t) {
        return update(requestBuilder.buildQuery(q), t);
    }

    public Mono<Long> update(Query query, T t) {
        return reactiveMongoTemplate.updateMulti(query, requestBuilder.buildUpdate(t), clazz).map(UpdateResult::getModifiedCount);
    }

    public Mono<Long> trash(Q q) {
        return trash(requestBuilder.buildQuery(q));
    }

    public Mono<Long> restore(Q q) {
        return restore(requestBuilder.buildQuery(q));
    }

    public Mono<Long> trash(Query query) {
        Update update = new Update();
        update.set("deleteTime", new Date());
        update.set("updateTime", new Date());
        return reactiveMongoTemplate.updateMulti(query, update, clazz).map(UpdateResult::getModifiedCount);
    }

    public Mono<Long> restore(Query query) {
        Update update = new Update();
        update.set("deleteTime", null);
        update.set("updateTime", new Date());
        return reactiveMongoTemplate.updateMulti(query, update, clazz).map(UpdateResult::getModifiedCount);
    }

    public Mono<Long> delete(Q q) {
        return delete(requestBuilder.buildQuery(q));
    }

    public Mono<Long> delete(Query query) {
        return reactiveMongoTemplate.remove(query, clazz).map(DeleteResult::getDeletedCount);
    }

    public Mono<T> add(T t) {
        requestBuilder.buildInsert(t);
        return reactiveMongoTemplate.insert(t);
    }

    public Flux<T> add(Collection<T> collection) {
        for (T t : collection) {
            requestBuilder.buildInsert(t);
        }
        return reactiveMongoTemplate.insert(collection, clazz);
    }

    public Mono<List<T>> link(String link, Mono<List<T>> list) {
        return Mono.empty();
    }

    public Flux<String> distinctString(String field) {
        return reactiveMongoTemplate.findDistinct(field, clazz, String.class);
    }

    public Flux<Float> distinctFloat(String field) {
        return reactiveMongoTemplate.findDistinct(field, clazz, Float.class);
    }

    public Flux<Integer> distinctInteger(String field) {
        return reactiveMongoTemplate.findDistinct(field, clazz, Integer.class);
    }

    public Flux<String> distinctString(String field, Q q) {
        return reactiveMongoTemplate.findDistinct(requestBuilder.buildQuery(q), field, clazz, String.class);
    }

    public Flux<Float> distinctFloat(String field, Q q) {
        return reactiveMongoTemplate.findDistinct(requestBuilder.buildQuery(q), field, clazz, Float.class);
    }

    public Flux<Integer> distinctInteger(String field, Q q) {
        return reactiveMongoTemplate.findDistinct(requestBuilder.buildQuery(q), field, clazz, Integer.class);
    }
}
