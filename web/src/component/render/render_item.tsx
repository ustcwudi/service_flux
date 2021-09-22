import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@mui/styles'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import moment from 'moment'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  left: {
    marginRight: 8,
    flex: 1,
  },
  center: (props: { size?: 'small' }) => ({
    flex: 0,
    lineHeight: props.size ? '40px' : '56px',
  }),
  right: {
    marginLeft: 8,
    flex: 1,
  },
})

// 时间区间
const TimeBetween = (props: { className?: string; disabled?: boolean; size?: 'small'; label: string; onChange: (e: undefined | (null | number)[]) => void }) => {
  const classes = useStyles(props)
  const [leftValue, setLeftValue] = useState<string>('')
  const [rightValue, setRightValue] = useState<string>('')
  const onChange = (l: string, r: string) => {
    if (l && r) props.onChange([moment(l).unix() * 1000000, moment(r).unix() * 1000000])
    else if (r) props.onChange([null, moment(r).unix() * 1000000])
    else if (l) props.onChange([moment(l).unix() * 1000000, null])
    else props.onChange(undefined)
  }
  return (
    <Box className={clsx(classes.root, props.className)}>
      <TextField
        disabled={props.disabled}
        InputLabelProps={{ shrink: true }}
        type="datetime-local"
        variant="outlined"
        className={classes.left}
        size={props.size}
        onChange={(e) => {
          setLeftValue(e.target.value)
          onChange(e.target.value, rightValue)
        }}
        label={`${props.label}下限`}
      />
      <Box className={classes.center}>-</Box>
      <TextField
        disabled={props.disabled}
        InputLabelProps={{ shrink: true }}
        type="datetime-local"
        variant="outlined"
        className={classes.right}
        size={props.size}
        onChange={(e) => {
          setRightValue(e.target.value)
          onChange(leftValue, e.target.value)
        }}
        label={`${props.label}上限`}
      />
    </Box>
  )
}

// 数值区间
const NumberBetween = (props: { className?: string; disabled?: boolean; type?: 'int' | 'float'; size?: 'small'; label: string; onChange: (e: undefined | (null | number)[]) => void }) => {
  const classes = useStyles(props)
  const [leftValue, setLeftValue] = useState<string>('')
  const [rightValue, setRightValue] = useState<string>('')
  const onChange = (l: string, r: string) => {
    let lv = props.type == 'int' ? parseInt(l) : parseFloat(l)
    let rv = props.type == 'int' ? parseInt(r) : parseFloat(r)
    if (l && r) props.onChange([lv, rv])
    else if (r) props.onChange([null, rv])
    else if (l) props.onChange([lv, null])
    else props.onChange(undefined)
  }
  return (
    <Box className={clsx(classes.root, props.className)}>
      <TextField
        disabled={props.disabled}
        type="number"
        variant="outlined"
        className={classes.left}
        size={props.size}
        onChange={(e) => {
          setLeftValue(e.target.value)
          onChange(e.target.value, rightValue)
        }}
        label={`${props.label}下限`}
      />
      <Box className={classes.center}>-</Box>
      <TextField
        disabled={props.disabled}
        type="number"
        variant="outlined"
        className={classes.right}
        size={props.size}
        onChange={(e) => {
          setRightValue(e.target.value)
          onChange(leftValue, e.target.value)
        }}
        label={`${props.label}上限`}
      />
    </Box>
  )
}

// 字符串键值对
const StringPair = (props: { className?: string; disabled?: boolean; size?: 'small'; label: string; onChange: (e: { [key: string]: string }) => void }) => {
  const classes = useStyles(props)
  const [leftValue, setLeftValue] = useState<string>('')
  const [rightValue, setRightValue] = useState<string>('')
  const onChange = (l: string, r: string) => {
    if (l && r) props.onChange(Object.fromEntries([[l, r]]))
    else props.onChange({})
  }
  return (
    <Box className={clsx(classes.root, props.className)}>
      <TextField
        disabled={props.disabled}
        variant="outlined"
        className={classes.left}
        value={leftValue}
        size={props.size}
        onChange={(e) => {
          let v = e.target.value.trim()
          setLeftValue(v)
          onChange(v, rightValue)
        }}
        label={props.label}
      />
      <Box className={classes.center}>:</Box>
      <TextField
        disabled={props.disabled}
        variant="outlined"
        className={classes.right}
        value={rightValue}
        size={props.size}
        onChange={(e) => {
          setRightValue(e.target.value)
          onChange(leftValue, e.target.value)
        }}
        label={`${props.label}值`}
      />
    </Box>
  )
}

// 数字键值对
const NumberPair = (props: { className?: string; disabled?: boolean; type?: 'int' | 'float'; size?: 'small'; label: string; onChange: (e: { [key: string]: number }) => void }) => {
  const classes = useStyles(props)
  const [leftValue, setLeftValue] = useState<string>('')
  const [rightValue, setRightValue] = useState<string>('')
  const onChange = (l: string, r: string) => {
    if (l && r) props.onChange(Object.fromEntries([[l, props.type == 'int' ? parseInt(r) : parseFloat(r)]]))
    else props.onChange({})
  }
  return (
    <Box className={clsx(classes.root, props.className)}>
      <TextField
        disabled={props.disabled}
        variant="outlined"
        className={classes.left}
        value={leftValue}
        size={props.size}
        onChange={(e) => {
          let v = e.target.value.trim()
          setLeftValue(v)
          onChange(v, rightValue)
        }}
        label={props.label}
      />
      <Box className={classes.center}>:</Box>
      <TextField
        disabled={props.disabled}
        type="number"
        variant="outlined"
        className={classes.right}
        value={rightValue}
        size={props.size}
        onChange={(e) => {
          setRightValue(e.target.value)
          onChange(leftValue, e.target.value)
        }}
        label={`${props.label}值`}
      />
    </Box>
  )
}

export default { TimeBetween, NumberBetween, StringPair, NumberPair }
