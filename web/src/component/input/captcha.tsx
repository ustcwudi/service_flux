import React, { useEffect, useState } from 'react'
import request from '../../request'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'

const useStyles = makeStyles({
  root: {
    position: 'relative',
  },
  captcha: {
    cursor: 'pointer',
    position: 'absolute',
    zIndex: 9,
    right: 2,
    top: 2,
    height: 52,
  },
})

export default (props: { children?: JSX.Element; onChange: (id: string) => void }) => {
  const classes = useStyles(props)
  const [src, setSrc] = useState<string | undefined>(undefined)
  const [refresh, setRefresh] = useState<number>(0)
  useEffect(() => {
    // 获取验证码
    request('captcha', {
      responseType: 'blob',
      parseResponse: false,
    })
      .then((res) => {
        props.onChange(res.headers.get('random'))
        return res.blob()
      })
      .then((res) => {
        const blob = new Blob([res])
        const src = URL.createObjectURL(blob)
        setSrc(src)
      })
  }, [refresh])
  return (
    <Box className={classes.root}>
      {props.children}
      <img className={classes.captcha} onClick={() => setRefresh(Math.random())} src={src} />
    </Box>
  )
}
