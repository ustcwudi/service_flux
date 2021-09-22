import Render from '../../../../component/render/render'
import FormRender from '../../../../component/render/render_form'
import SearchRender from '../../../../component/render/render_search'
import { ${model.name}, ${model.name}Query } from './index'
import { Column, InputProps } from '../../../../index'

export default function (): Column<${model.name}, ${model.name}Query>[] {
  return [
    /* range fields */
    <#list model.fields as field>
    {
      name: '${c(field.name)}',
      type: '${field.type}',
      label: '${field.description}',
      <#if field.nullable>
      nullable: true,
      </#if>
      <#if field.link??>
      link: '${u(field.link)}',
      </#if>
      <#if field.map??><#assign keys = field.map?keys>
      map: {
        <#list keys as key>
        ${key}: '${field.map[key]}',
        </#list>
      },
      </#if>
      <#if field.type == "upload" || field.type == "upload[]">
      /* if upload */
      render: (model: ${model.name}) => Render.renderUpload<#if field.type == "upload[]">Array</#if>(model.${c(field.name)}),
      <#elseif field.link??>
      /* if link */
      render: (model: ${model.name}) => Render.renderModel<#if field.type == "id[]">Array</#if>(model.${c(field.name)}Data),
      /* render form */
      renderForm: (column: Column<${model.name}, ${model.name}Query>, props: InputProps<${model.name}>) => FormRender.renderModel<#if field.type == "id[]">Array</#if>(column, props),
      <#else>
      /* render */
      render: (model: ${model.name}) => Render.render${mt(field.type)}(model.${c(field.name)}),
      /* render form */
      renderForm: (column: Column<${model.name}, ${model.name}Query>, props: InputProps<${model.name}>) => FormRender.render${mt(field.type)}(column, props),
      </#if>
      <#if field.search??>
      /* render search */
      search: '${field.search}',
      renderSearch: (column: Column<${model.name}, ${model.name}Query>, props: InputProps<${model.name}Query>) => SearchRender.render${mt(field.type)}(column, props),
      </#if>
      <#if field.rule??>
      /* rule */
      rule: {
        <#if field.rule.size??>
        size: ${field.rule.size?c},
        </#if>
        <#if field.rule.ext??>
        ext: [<#list field.rule.ext as ext>'${ext}'<#sep>, </#list>],
        </#if>
      }
      </#if>
    },
    </#list>
  ]
}
