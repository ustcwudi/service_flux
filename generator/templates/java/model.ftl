package edu.hubu.${module}.model;

import java.util.*;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import edu.hubu.core.base.BaseModel;
import io.swagger.annotations.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.io.Serializable;

@Data
@Document
@EqualsAndHashCode(callSuper = true)
@ApiModel("${model.description}")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ${model.name} extends <#if model.inherit>edu.hubu.core.model.${model.name}<#else>BaseModel</#if> implements Serializable {
    <#list model.fields as field><#if !field.inherit>

    @ApiModelProperty("${field.description}")
    private ${jt(field.type)} ${c(field.name)};
    <#if field.link??>

    @Transient
    <#if field.type == "id">
    private ${field.link} ${c(field.name)}Data;
    <#else>
    private List<${field.link}> ${c(field.name)}Data;
    </#if>
    </#if>
    <#if field.nullable>

    @JsonIgnore
    @Transient
    private boolean assign${field.name};

    public void set${field.name}(${jt(field.type)} value) {
        this.${c(field.name)} = value;
        this.assign${field.name} = true;
    }
    </#if>
    </#if></#list>
}