import React, { useState } from 'react'
import request from '../../request'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import Captcha from '../../component/input/captcha'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../store/userSlice'

export default () => {
  const dispatch = useDispatch()
  let history = useHistory()
  // 组件
  const [model, setModel] = useState<{
    random?: string
    captcha?: string
    account?: string
    password?: string
  }>({})
  // 请求
  const loginRequest = () => {
    request('user/login', { method: 'post', data: model, headers: { Link: 'role' } }).then((response) => {
      if (response.success) {
        dispatch(login(response.data))
        let homepage = response.data.roleData.homepage
        if (homepage) history.push(homepage)
        else history.push('/main')
      }
    })
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          variant="outlined"
          label={'账号'}
          onChange={(e) => {
            setModel({ ...model, account: e.target.value })
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          type="password"
          variant="outlined"
          label={'密码'}
          onChange={(e) => {
            setModel({ ...model, password: e.target.value })
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Captcha onChange={(random) => setModel({ ...model, random: random })}>
          <TextField fullWidth variant="outlined" label="验证码" onChange={(e) => setModel({ ...model, captcha: e.target.value })} />
        </Captcha>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={loginRequest} size="large" color="primary" startIcon={<VpnKeyIcon />} fullWidth>
          登录云端
        </Button>
      </Grid>
    </Grid>
  )
}
