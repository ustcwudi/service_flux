import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Icon from '../icon/icon'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

const useStyles = makeStyles({
  grid: {
    marginBottom: 0,
  },
  actions: {
    marginTop: -4,
    marginBottom: 16,
    marginRight: 16,
  },
})

export default (props: { children?: any; visible: boolean; title?: JSX.Element | string; onCancel?: () => void; onFinish: () => void }) => {
  const classes = useStyles()
  const { title, visible, onFinish, onCancel, children } = props
  return (
    <Dialog fullWidth={true} scroll="body" maxWidth="md" open={visible} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Grid className={classes.grid} container spacing={3}>
          {children}
        </Grid>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button variant="contained" color="info" startIcon={<Icon name="Replay" />} onClick={onCancel}>
          取消
        </Button>
        <Button variant="contained" color="primary" startIcon={<Icon name="Telegram" />} onClick={onFinish}>
          提交
        </Button>
      </DialogActions>
    </Dialog>
  )
}
