import { useState, useEffect, useContext, useMemo } from 'react'
import { makeStyles } from '@mui/styles'
import request from '../../../../request'
import allColumns from './columns'
import { useDispatch, useSelector } from 'react-redux'
import {buttonFilter, filter, formFilter, searchFilter} from '../../../../tableUtil'
import Collapse from '@mui/material/Collapse'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import LinearProgress from '@mui/material/LinearProgress'
import Toolbar from '@mui/material/Toolbar'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import DataTable from '../../../../component/table/table'
import ModalForm from '../../../../component/modal/modal_form'
import FileUpload from '../../../../component/input/file_upload'
import IconButton from '../../../../component/icon/icon_button'
import {${model.name}, ${model.name}Query} from "./index";
import { load, selectLoading } from '../../../../store/loadingSlice'
import { TableProps } from '../../../../index'

const useStyles = makeStyles({
  title: {
    flex: '1 1 100%',
  },
  searchForm: {
    margin: 0,
  },
})


export default (props: TableProps<${model.name}, ${model.name}Query>) => {
  const classes = useStyles()
  // 载入状态
  const loading = useSelector(selectLoading)
  // 选中项
  const [selection, setSelection] = useState<${model.name}[]>([])
  // 查询参数
  const [trash, setTrash] = useState<boolean>(false)
  const [where, setWhere] = useState<${model.name}Query>({})
  const [sort, setSort] = useState<{ field: string; direction: 'asc' | 'desc' }>({ field: 'id', direction: 'desc' })
  const [pagination, setPagination] = useState<{ current: number; pageSize: number }>({ current: 1, pageSize: 10 })
  // 查询状态
  const [search, setSearch] = useState<boolean>(false)
  const searchBar = useMemo(() => {
    return search ? <Toolbar><Grid container className={classes.searchForm} spacing={3}>
      {searchFilter(allColumns(), props.renderSearch).map(v => v ? v({ onChange: (k, v) => { where[k] = v; setWhere({ ...where }) }}) : undefined)}
    </Grid></Toolbar> : setWhere({})
  }, [search])
  // 新增状态
  const [add, setAdd] = useState<boolean>(false)
  const addModal = useMemo(() => {
    let record: ${model.name} = {};
    return add ? <ModalForm title="新增" visible={true} onCancel={() => setAdd(false)} onFinish={() => { if (verify(record)) insertRequest(record) }}>
      {formFilter(allColumns(), props.renderAdd).map(v => v ? v({ default: {}, onChange: (k, v) => record[k] = v }) : undefined)}
    </ModalForm> : undefined
  }, [add])
  // 修改状态
  const [modify, setModify] = useState<${model.name} | undefined>(undefined)
  const modifyModal = useMemo(() => {
    let record: ${model.name} = {};
    return modify ? <ModalForm title="修改" visible={true} onCancel={() => setModify(undefined)}
      onFinish={() => { if (verify(record)) updateRequest({ update: record, where: { id: [modify.id], trash: trash } }); }}>
      {formFilter(allColumns(), props.renderUpdate).map(v => v ? v({ default: modify, onChange: (k, v) => record[k] = v }) : undefined)}
    </ModalForm> : undefined
  }, [modify])
  // [废弃/还原]请求
  const actionRequest = (action: string, form: { id: (string | undefined)[]; trash: boolean }) =>
    request('/api/${u(model.name)}/' + action, {
      method: 'put',
      data: form,
    }).then((result) => {
      // 确认数量
      if (result.success) {
        if (result.data == form.id.length) {
          form.id.forEach((id) => {
            source.splice(
              source.findIndex((row) => row.id === id),
              1
            )
          })
          setSource([...source])
          setCount(count - form.id.length)
          setSelection([])
          props.onSelect?.([])
        }
      }
    })
  // 查询请求
  const [source, setSource] = useState<${model.name}[]>([])
  const sourceRequest = () =>
    request('/api/${u(model.name)}/query/' + pagination.current + '/' + pagination.pageSize, {
      method: 'post',
      data: { trash: trash, ...where, ...props.where },
      headers: {
        // 关联查询
        Link: '<#list model.fields as field><#if field.link??>${u(field.name)},</#if></#list>'
      },
    }).then((result) => {
      if (result.data) {
        setSource(result.data)
      } else {
        setSource([])
      }
    })
  // 统计请求
  const [count, setCount] = useState<number>(0)
  const countRequest = () =>
    request('/api/${u(model.name)}/count', {
      method: 'post',
      data: { trash: trash, ...where, ...props.where },
    }).then((result) => {
      if (result.data) {
        setCount(result.data)
      } else {
        setCount(0)
      }
    })
  // 修改请求
  const updateRequest = (data: any) =>
    request(`/api/${u(model.name)}`, {
      method: 'put',
      data: data,
      headers: {
        Link: '<#list model.fields as field><#if field.link??>${u(field.name)},</#if></#list>',
      },
    })
  // 新增请求
  const insertRequest = (data: any) =>
    request(`/api/${u(model.name)}`, {
      method: 'post',
      data: data,
      headers: {
        Link: '<#list model.fields as field><#if field.link??>${u(field.name)},</#if></#list>',
      },
    }).then((result) => {
      if (result.success) {
        if (source.length === pagination.pageSize) source.pop()
        source.unshift(result.data)
        setSource([...source])
        setAdd(false)
      }
    })
  // 删除请求
  const removeRequest = (form: { id: (string | undefined)[]; trash: boolean }) =>
    request(`/api/${u(model.name)}`, {
      method: 'delete',
      data: form,
    }).then((result) => {
      if (result.success) {
        if (result.data == form.id.length) {
          form.id.forEach((id) => {
            source.splice(
              source.findIndex((row) => row.id === id),
              1
            )
          })
          setSource([...source])
          setSelection([])
          props.onSelect?.([])
        }
      }
    })
  // 列表
  const columns = useMemo(() => {
    let operation = {
      name: '_', label: '', render: (model: ${model.name}) => buttonFilter({
        'update': <IconButton key="upload" title="修改" icon="Edit" color="info" onClick={() => setModify(model)} />,
        <#list model.fields as field>
        <#if field.type == "upload" ||  field.type == "upload[]">
        'upload${field.name}': <FileUpload key="upload${field.name}"
          data={{id: model.id }} action={"/api/${u(model.name)}/upload/${u(field.name)}"}
          onUpload={(file: any) => { model.${u(field.name)} = file }}>
          <IconButton color="info" title="上传${field.description}" icon="CloudUpload" /></FileUpload>,
        </#if>
        </#list>
      }, props.renderColumnButton, props.moreColumnButton?.(model))
    }
    return filter(props.moreColumn ? [...allColumns(), ...props.moreColumn, operation] : [...allColumns(), operation], props.render)
  }, [])

  // 工具栏
  const tableBar = useMemo(() => {
    let buttons = {
      'add': <IconButton key="add" icon="Add" title="新增" onClick={() => setAdd(true)} />,
      'search': <IconButton key="search" icon="Search" title="搜索" color={search ? "primary" : "info"} onClick={() => setSearch(!search)} />,
      'refresh': <IconButton key="refresh" title="刷新" icon="Refresh" onClick={(e: any) => setWhere({ ...where })} />,
      'import': <FileUpload key="import" action={"/api/admin/${u(model.name)}/import"}
        onUpload={(list: any) => { setWhere({}); }}>
        <IconButton title="导入" icon="Publish" />
      </FileUpload>,
      'trash': <IconButton key="trash" title="回收站" color={trash ? "primary" : "info"} icon="DeleteOutline"
        onClick={() => { setTrash(!trash); setSelection([]); }} />
    }
    return <Toolbar>
      <Typography className={classes.title} variant="h6" component="div">
        标题
      </Typography>
      {buttonFilter(buttons, props.renderTableButton, props.moreTableButton)}
    </Toolbar>
  }, [trash, search])

  // 选择工具栏
  const selectionBar = useMemo(() => {
    let buttons: { [key: string]: JSX.Element } = trash ? {
      'unselect': <IconButton key="unselect" color="info" title="取消" icon="Replay" onClick={() => { setSelection([]); props.onSelect?.([]); }} />,
      'trash': <IconButton key="trash" title="恢复" color="info" icon="SettingsBackupRestore" onClick={() => actionRequest('restore', { id: selection.map(i => i.id), trash: trash })} />,
      'delete': <IconButton key="delete" title="彻底删除" icon="DeleteForever" onClick={() => removeRequest({ id: selection.map(i => i.id), trash: trash })} />
    } : {
      'unselect': <IconButton key="unselect" color="info" title="取消" icon="Replay" onClick={() => { setSelection([]); props.onSelect?.([]); }} />,
      'trash': <IconButton key="trash" title="删除" icon="Delete" onClick={() => actionRequest('trash', { id: selection.map(i => i.id), trash: trash })} />,
    }
    return <Toolbar>
      <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
        选中 {selection.length} 项
      </Typography>
      {buttonFilter(buttons, props.renderSelectionButton, props.moreSelectionButton)}
    </Toolbar>
  }, [trash, selection])

  // 验证字段
  const verify = (record: any) => {
    return true
  }

  // 模板
  return <Collapse in={props.display !== false}><Paper elevation={5}>
    {selection.length ? selectionBar : tableBar}
    {searchBar}
    {loading ? <LinearProgress color={trash ? "secondary" : "primary"} /> : <LinearProgress color={trash ? "secondary" : "primary"} variant="determinate" value={100} />}
    <TableContainer>
      <DataTable<${model.name}, ${model.name}Query> size="small" dataSource={source} selection={selection} columns={columns} selectType={props.canSelect}
        onSelectChange={(records: ${model.name}[]) => { setSelection(records); props.onSelect?.(records) }} />
    </TableContainer>
    {addModal}
    {modifyModal}
  </Paper></Collapse>
};