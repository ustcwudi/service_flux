package edu.hubu.${module}.request.builder;

import edu.hubu.${module}.model.${model.name};
import edu.hubu.core.base.BaseRequestBuilder;
import edu.hubu.core.base.QueryType;
import edu.hubu.${module}.request.query.${model.name}Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.CriteriaDefinition;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

@Component("${module}.${model.name}QueryBuilder")
public class ${model.name}Builder extends BaseRequestBuilder<${model.name}, ${model.name}Query> {
    <#if model.inherit>

    @Autowired
    edu.hubu.core.request.builder.${model.name}Builder coreBuilder;
    </#if>

    @Override
    public Query buildQuery(${model.name}Query query) {
        Query result = <#if model.inherit>coreBuilder<#else>super</#if>.buildQuery(query);
        <#list model.fields as field><#assign type = qt(field.type, field.search)><#if type != "" && !field.inherit>
        if (query.get${field.name}() != null) {
            CriteriaDefinition criteria = builder.build${mt(field.type)}("${c(field.name)}", query.get${field.name}(), QueryType.${field.search});
            if (criteria != null)
                result.addCriteria(criteria);
        }
        <#if field.nullable>
        if (query.get${field.name}() == null && query.isAssign${field.name}()) {
            result.addCriteria(builder.buildNull("${c(field.name)}"));
        }
        </#if>
        </#if></#list>
        return result;
    }

    @Override
    public Update buildUpdate(${model.name} model) {
        Update update = <#if model.inherit>coreBuilder<#else>super</#if>.buildUpdate(model);
        <#list model.fields as field><#if !field.inherit>
        if (model.get${field.name}() != null)
            update.set("${c(field.name)}", model.get${field.name}());
        <#if field.nullable>
        if (model.get${field.name}() == null && model.isAssign${field.name}())
            update.set("${c(field.name)}", null);
        </#if>
        </#if></#list>
        return update;
    }

    @Override
    public void buildInsert(${model.name} model) {
        <#if model.inherit>coreBuilder<#else>super</#if>.buildInsert(model);
    }
}