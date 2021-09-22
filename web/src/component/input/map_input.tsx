import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import Popover from '@mui/material/Popover'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import InputBase from '@mui/material/InputBase'
import InputAdornment from '@mui/material/InputAdornment'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Icon from '../icon/icon'

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
  pair: {
    width: 400,
    display: 'flex',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    margin: 4,
    padding: 8,
  },
})

export default (props: { size?: 'small'; label: string; defaultValue?: { [key: string]: string }; disabled: boolean; onChange: (e: any) => void }) => {
  const classes = useStyles(props)
  // 设置模式
  const [pop, setPop] = useState(false)
  const [key, setKey] = useState('')
  const [value, setValue] = useState('')
  const [options, setOptions] = useState<{ [key: string]: string }>(props.defaultValue ? props.defaultValue : {})
  const [anchor, setAnchor] = useState<any>(null)
  return (
    <Box className={classes.root}>
      <FormControl className={classes.select} variant="outlined" fullWidth>
        <InputLabel>{props.label}</InputLabel>
        <Select
          multiple
          label={props.label}
          disabled={props.disabled}
          onChange={(e: any) => {
            let map = e.target.value.map((key: string) => {
              return [key, options[key]]
            })
            props.onChange(Object.fromEntries(map))
          }}
          defaultValue={props.defaultValue ? Object.keys(props.defaultValue) : []}
        >
          {Object.keys(options).map((key) => (
            <MenuItem key={key} value={key}>
              {`${key} : ${options[key]}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Tooltip title={'添加选项'}>
        <span>
          <IconButton
            disabled={props.disabled}
            className={classes.button}
            onClick={(e) => {
              setPop(!pop)
              setAnchor(e.currentTarget)
            }}
          >
            <Icon name={'AddCircle'} classes={classes} />
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
        <Box className={classes.pair}>
          <InputBase
            onChange={(e) => setKey(e.target.value)}
            className={classes.input}
            value={key}
            placeholder="添加键"
            endAdornment={
              <InputAdornment position="end">
                <Icon name="ChevronRight" />
              </InputAdornment>
            }
          />
          <InputBase
            onChange={(e) => setValue(e.target.value)}
            className={classes.input}
            value={value}
            placeholder="添加值"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    if (key && value) {
                      setKey('')
                      setValue('')
                      options[key] = value
                      setOptions({ ...options })
                    }
                  }}
                >
                  <Icon name="Add" />
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>
      </Popover>
    </Box>
  )
}
