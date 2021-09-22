package edu.hubu.${module}.request.query;

import java.util.*;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import edu.hubu.core.base.BaseQuery;
import io.swagger.annotations.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Document
@EqualsAndHashCode(callSuper = true)
@ApiModel("${model.description}查询")
public class ${model.name}Query extends <#if model.inherit>edu.hubu.core.request.query.${model.name}Query<#else>BaseQuery</#if> {
    <#list model.fields as field><#assign type = qt(field.type, field.search)><#if type != "" && !field.inherit>

    @ApiModelProperty("${field.description}")
    private ${qt(field.type, field.search)} ${c(field.name)};
    <#if field.nullable>

    @JsonIgnore
    private boolean assign${field.name};

    public void set${field.name}(${jt(field.type)} value) {
    this.${c(field.name)} = value;
    this.assign${field.name} = true;
    }
    </#if>
    </#if></#list>
}