import React, { useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import Button from '@mui/material/Button'
import Icon from './icon'

const useStyles = makeStyles({
  root: {
    whiteSpace: 'nowrap',
    marginLeft: 4,
    marginRight: 4,
    minWidth: 'initial',
  },
})

export default function (props: any) {
  const classes = useStyles(props)
  return (
    <Button
      className={classes.root}
      startIcon={typeof props.icon === 'string' ? <Icon name={props.icon} /> : props.icon}
      onClick={props.onClick}
      size={props.size ? props.size : 'small'}
      color={props.color ? props.color : 'primary'}
      variant={props.variant ? props.variant : 'contained'}
    >
      {props.title ? props.title : ''}
    </Button>
  )
}
