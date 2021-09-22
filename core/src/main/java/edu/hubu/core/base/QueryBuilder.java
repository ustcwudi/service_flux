package edu.hubu.core.base;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.CriteriaDefinition;

import java.util.List;
import java.util.Map;

public class QueryBuilder {

    public CriteriaDefinition buildNull(String key) {
        return Criteria.where(key).is(null);
    }

    public CriteriaDefinition buildBool(String key, Boolean value, QueryType type) {
        switch (type) {
            case equal:
                return Criteria.where(key).is(value);
        }
        return null;
    }

    public CriteriaDefinition buildInt(String key, Integer value, QueryType type) {
        switch (type) {
            case equal:
                return Criteria.where(key).is(value);
        }
        return null;
    }

    public CriteriaDefinition buildIntArray(String key, List<Integer> value, QueryType type) {
        switch (type) {
            case in:
                return Criteria.where(key).in(value);
            case between:
                Criteria criteria = new Criteria();
                if (value.size() > 1) {
                    Integer left = value.get(0);
                    Integer right = value.get(1);
                    if (left != null)
                        criteria.andOperator(Criteria.where(key).gte(left));
                    if (right != null)
                        criteria.andOperator(Criteria.where(key).lte(right));
                }
                return criteria;
        }
        return null;
    }

    public CriteriaDefinition buildIntMap(String key, Map<String, Integer> value, QueryType type) {
        Criteria criteria = new Criteria();
        for (Map.Entry<String, Integer> entry : value.entrySet()) {
            switch (type) {
                case equal:
                    criteria.andOperator(Criteria.where(key + '.' + entry.getKey()).is(entry.getValue()));
            }
        }
        return criteria;
    }

    public CriteriaDefinition buildFloat(String key, Float value, QueryType type) {
        switch (type) {
            case equal:
                return Criteria.where(key).is(value);
        }
        return null;
    }

    public CriteriaDefinition buildFloatArray(String key, List<Float> value, QueryType type) {
        switch (type) {
            case in:
                return Criteria.where(key).in(value);
            case between:
                Criteria criteria = new Criteria();
                if (value.size() > 1) {
                    Float left = value.get(0);
                    Float right = value.get(1);
                    if (left != null)
                        criteria.andOperator(Criteria.where(key).gte(left));
                    if (right != null)
                        criteria.andOperator(Criteria.where(key).lte(right));
                }
                return criteria;
        }
        return null;
    }

    public CriteriaDefinition buildFloatMap(String key, Map<String, Float> value, QueryType type) {
        Criteria criteria = new Criteria();
        for (Map.Entry<String, Float> entry : value.entrySet()) {
            switch (type) {
                case equal:
                    criteria.andOperator(Criteria.where(key + '.' + entry.getKey()).is(entry.getValue()));
            }
        }
        return criteria;
    }

    public CriteriaDefinition buildString(String key, String value, QueryType type) {
        switch (type) {
            case like:
                return Criteria.where(key).regex(value);
            case equal:
                return Criteria.where(key).is(value);
        }
        return null;
    }

    public CriteriaDefinition buildString(String key, List<String> value, QueryType type) {
        switch (type) {
            case in:
                return Criteria.where(key).in(value);
        }
        return null;
    }

    public CriteriaDefinition buildStringArray(String key, String value, QueryType type) {
        switch (type) {
            case equal:
                return Criteria.where(key).is(value);
            case like:
                return Criteria.where(key).regex(value);
        }
        return null;
    }

    public CriteriaDefinition buildStringArray(String key, List<String> value, QueryType type) {
        switch (type) {
            case in:
                return Criteria.where(key).in(value);
        }
        return null;
    }

    public CriteriaDefinition buildStringMap(String key, Map<String, String> value, QueryType type) {
        Criteria criteria = new Criteria();
        for (Map.Entry<String, String> entry : value.entrySet()) {
            switch (type) {
                case like:
                    criteria.andOperator(Criteria.where(key + '.' + entry.getKey()).regex(entry.getValue()));
                case equal:
                    criteria.andOperator(Criteria.where(key + '.' + entry.getKey()).is(entry.getValue()));
            }
        }
        return criteria;
    }

    public CriteriaDefinition buildStringArrayMap(String key, Map<String, String> value, QueryType type) {
        Criteria criteria = new Criteria();
        for (Map.Entry<String, String> entry : value.entrySet()) {
            switch (type) {
                case equal:
                    criteria.andOperator(Criteria.where(key + '.' + entry.getKey()).is(entry.getValue()));
                case like:
                    criteria.andOperator(Criteria.where(key + '.' + entry.getKey()).regex(entry.getValue()));
            }
        }
        return criteria;
    }
}
