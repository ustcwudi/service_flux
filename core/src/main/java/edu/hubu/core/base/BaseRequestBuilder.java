package edu.hubu.core.base;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.CriteriaDefinition;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import java.util.Date;

public abstract class BaseRequestBuilder<T extends BaseModel, Q extends BaseQuery> {

    protected QueryBuilder builder = new QueryBuilder();

    public Query buildQuery(Q q) {
        Query result = new Query();
        if (q.getId() != null) {
            CriteriaDefinition criteria = builder.buildStringArray("id", q.getId(), QueryType.in);
            if (criteria != null)
                result.addCriteria(criteria);
        }
        if (q.getTrash() == null || !q.getTrash()) {
            result.addCriteria(Criteria.where("deleteTime").is(null));
        } else {
            result.addCriteria(Criteria.where("deleteTime").ne(null));
        }
        return result;
    }

    public Update buildUpdate(T t) {
        Update update = new Update();
        update.set("updateTime", new Date());
        return update;
    }

    public void buildInsert(T t) {
        t.setCreateTime(new Date());
        t.setDeleteTime(null);
        t.setUpdateTime(null);
    }
}
