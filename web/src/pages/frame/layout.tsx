import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Login from './login'

const useStyles = makeStyles({
  frame: {
    content: '""',
    width: '100%',
    height: '100%',
    marginLeft: '-45%',
    backgroundImage: `url(/login-bg.svg)`,
    backgroundPosition: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto 100%',
    minWidth: '1000px',
  },
  center: {
    width: '100%',
    height: '100%',
    marginLeft: '45%',
  },
  image: {
    width: '400px',
    marginBottom: 16,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
  },
  split: {
    float: 'left',
    width: '50%',
  },
  box: {
    width: '400px',
    margin: 'auto',
    marginTop: '300px',
  },
})

export default () => {
  const classes = useStyles()
  const match = useRouteMatch()
  return (
    <Box className={classes.frame}>
      <Box className={classes.center}>
        <Box className={classes.split}>
          <Box className={classes.box}>
            <img className={classes.image} src={'/login-box-bg.svg'} alt="box" />
            <Typography variant="h4" className={classes.title}>
              智慧云管理系统
            </Typography>
          </Box>
        </Box>
        <Box className={classes.split}>
          <Box className={classes.box}>
            <Switch>
              <Route path={`${match.path}/login`} component={Login} />
            </Switch>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
