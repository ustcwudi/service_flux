import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Icon from '../icon/icon'
import Popover from '@mui/material/Popover'
import InputBase from '@mui/material/InputBase'
import InputAdornment from '@mui/material/InputAdornment'
import { Model } from '../../index'

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  select: {
    flex: 1,
  },
  button: (props: { size?: 'small' }) => ({
    marginTop: props.size ? 0 : 8,
    marginLeft: 8,
    height: 40,
    width: 40,
  }),
  icon: {
    width: 16,
    height: 16,
  },
  input: {
    margin: 4,
    padding: 8,
  },
})

export default (props: { size?: 'small'; multiple?: boolean; label: string; link?: string; defaultValue?: Model | Model[]; disabled: boolean; onChange: (e: any) => void }) => {
  const classes = useStyles(props)
  // 设置模式
  const [pop, setPop] = useState(false)
  const [anchor, setAnchor] = useState<any>(null)
  // 设置选项列表
  const [options, setOptions] = useState<{ id: string | undefined; name: any }[]>(
    props.defaultValue
      ? Array.isArray(props.defaultValue)
        ? props.defaultValue.map((m) => {
            return { id: m.id, name: m.name }
          })
        : [{ id: props.defaultValue.id, name: props.defaultValue.name }]
      : []
  )
  // 设置关键词
  const [keyword, setKeyword] = useState('')
  // 获取查询数据
  // const { loading, run } = useRequest(`/api/${props.link}?pageSize=10&page=0&name=${keyword}`, {
  //   debounceInterval: 500,
  //   manual: true,
  //   onSuccess: result => {
  //     if (result.data) {
  //       const list = result.data
  //       options.forEach(i => {
  //         let index = list.findIndex((j: any) => j?.id == i?.id)
  //         if (index == -1) list.push(i)
  //       })
  //       setOptions(list)
  //     }
  //   },
  // })
  return (
    <Box className={classes.root}>
      <FormControl className={classes.select} variant="outlined" size={props.size} fullWidth>
        <InputLabel>{props.label}</InputLabel>
        <Select
          label={props.label}
          disabled={props.disabled}
          multiple={props.multiple}
          onChange={props.onChange}
          defaultValue={props.defaultValue ? (Array.isArray(props.defaultValue) ? props.defaultValue.map((m) => m.id) : props.defaultValue.id) : props.multiple ? [] : ''}
        >
          {options?.map((i) => (
            <MenuItem key={i.id} value={i.id}>
              {i.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Tooltip title="搜索">
        <span>
          <IconButton
            disabled={props.disabled}
            className={classes.button}
            onClick={(e) => {
              setPop(!pop)
              setAnchor(e.currentTarget)
            }}
          >
            <Icon name={'Send'} classes={classes} />
          </IconButton>
        </span>
      </Tooltip>
      <Popover
        id={props.label + '_popover'}
        open={pop}
        anchorEl={anchor}
        onClose={() => {
          setPop(false)
          setAnchor(null)
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <InputBase
          onChange={(e) => setKeyword(e.target.value)}
          className={classes.input}
          value={keyword}
          placeholder="搜索选项"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  // if (keyword) run()
                  setPop(false)
                  setAnchor(null)
                }}
              >
                <Icon name="Search" />
              </IconButton>
            </InputAdornment>
          }
        />
      </Popover>
    </Box>
  )
}
