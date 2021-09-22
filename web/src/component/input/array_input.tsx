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
  input: {
    margin: 4,
    padding: 8,
  },
})

export default (props: { size?: 'small'; label: string; defaultValue?: (number | string)[]; disabled: boolean; onChange: (e: any) => void }) => {
  const classes = useStyles(props)
  // 设置模式
  const [pop, setPop] = useState(false)
  const [input, setInput] = useState('')
  const [options, setOptions] = useState<(number | string)[]>(props.defaultValue ? props.defaultValue : [])
  const [anchor, setAnchor] = useState<any>(null)
  return (
    <Box className={classes.root}>
      <FormControl className={classes.select} variant="outlined" fullWidth>
        <InputLabel>{props.label}</InputLabel>
        <Select multiple label={props.label} disabled={props.disabled} onChange={props.onChange} defaultValue={props.defaultValue ? props.defaultValue : []}>
          {options.map((i) => (
            <MenuItem key={i} value={i}>
              {i}
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
        <InputBase
          onChange={(e) => setInput(e.target.value)}
          className={classes.input}
          value={input}
          placeholder="添加选项"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  setInput('')
                  if (options.findIndex((v) => v === input) === -1) {
                    options.push(input)
                    setOptions(options)
                  }
                }}
              >
                <Icon name="Add" />
              </IconButton>
            </InputAdornment>
          }
        />
      </Popover>
    </Box>
  )
}
