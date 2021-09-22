import React from 'react'
import { ThemeProvider, makeStyles } from '@mui/styles'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { alert, selectMessage } from './store/messageSlice'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Frame from './pages/frame/layout'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: { main: '#1b4fab' },
    secondary: { main: '#c85d44' },
  },
})

const useStyles = makeStyles({
  app: {
    height: '100%',
  },
})

const AlertBar = () => {
  const message = useSelector(selectMessage)
  const dispatch = useDispatch()
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={message !== undefined}
      autoHideDuration={3000}
      transitionDuration={{ appear: 200, enter: 300, exit: 0 }}
      onClose={() => {
        dispatch(alert(undefined, undefined))
      }}
    >
      <Alert elevation={6} severity={message?.type} variant="filled">
        {message?.content}
      </Alert>
    </Snackbar>
  )
}

export default () => {
  const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.app}>
        <BrowserRouter>
          <Switch>
            <Route path="/frame" component={Frame} />
            <React.Suspense fallback={<div>loading...</div>}>
              <Route path="/main" component={React.lazy(() => import('./pages/main/layout'))} />
            </React.Suspense>
          </Switch>
        </BrowserRouter>
        <AlertBar />
      </div>
    </ThemeProvider>
  )
}
