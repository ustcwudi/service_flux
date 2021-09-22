import { Model, QueryModel } from '../../../../index'
<#list model.fields as field>
<#if field.link??>
import { ${field.link} } from '../${u(field.link)}'
</#if>
</#list>

export declare class ${model.name} extends Model {
  <#list model.fields as field>
  // ${field.description}
  ${c(field.name)}?: ${st(field.type)}<#if field.nullable> | null</#if>
  <#if field.link??>
  ${c(field.name)}Data?: ${field.link}<#if field.type == "id[]">[]</#if>
  </#if>
  </#list>
}

export declare class ${model.name}Query extends QueryModel {
  <#list model.fields as field>
  <#if field.search??>
  // ${field.description}
  ${c(field.name)}?: ${qt(field.type, field.search, "js")}<#if field.nullable> | null</#if>
  </#if>
  </#list>
}