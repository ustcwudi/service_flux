import React, { useState, useEffect, useMemo, PropsWithChildren } from 'react'
import { Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import request from '../../request'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import Paper from '@mui/material/Paper'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout, selectUser } from '../../store/userSlice'
import Icon from '../../component/icon/icon'
import UploadPassword from '../../component/modal/update_password'
import { MItem } from '../../index'
import Login from '../frame/login'

const useStyles = makeStyles({
  nested: {
    paddingLeft: 32,
  },
  logo: {
    marginRight: 16,
  },
  title: {
    flexGrow: 1,
    color: 'white',
  },
  breadcrumbs: {},
  breadcrumb: {
    display: 'flex',
  },
  icon: {
    marginRight: 4,
  },
  main: {
    display: 'flex',
    minHeight: '100%',
    paddingTop: 64,
    backgroundColor: '#eee',
  },
  menu: {
    width: 200,
    minWidth: 200,
    margin: '16px 0 16px',
  },
  iconMenu: {
    width: 80,
    minWidth: 80,
    margin: '16px 0 16px',
  },
  menuItem: {
    justifyContent: 'center',
  },
  menuItemIcon: {
    color: '#000',
  },
  content: {
    padding: 16,
    flex: 1,
    backgroundColor: '#eee',
  },
})

export default (props: PropsWithChildren<{}>) => {
  const classes = useStyles()
  // 路径
  const match = useRouteMatch()
  let location = useLocation()
  let history = useHistory()
  // 用户菜单
  const [userMenuAnchor, setUserMenuAnchor] = React.useState<null | HTMLElement>(null)
  // 对话框
  const [modal, setModal] = useState<JSX.Element | undefined>(undefined)
  // 简略菜单
  const [iconMenu, setIconMenu] = useState<boolean>(false)
  // 菜单列表
  const [menuArray, setMenuArray] = useState<MItem[]>([])
  // 当前一级菜单ID
  const [topMenu, setTopMenu] = useState<MItem>()
  // 展开二级菜单ID
  const [expandMenu, setExpandMenu] = useState<string>()
  // 用户信息
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  // 用户信息获取请求
  const loginRequest = () => {
    request(`user/info`, { method: 'get' }).then((response) => {
      if (response.success) {
        menuRequest(response.data.role)
        dispatch(login(response.data))
      }
    })
  }
  useEffect(() => {
    if (user === undefined) loginRequest()
    else menuRequest(user.role)
  }, [])
  // 用户登出
  const logoutRequest = () => {
    request(`user/logout`, { method: 'post' }).then((response) => {
      if (response.success) {
        dispatch(logout())
        history.push('/frame/login')
      }
    })
  }
  // 请求菜单列表
  const menuRequest = (role: string) => {
    request(`menu?role=${role}`, { method: 'get' }).then((result) => {
      if (result.data) {
        // 转换为MenuItem类型
        result.data = result.data.map((i: any) => {
          return {
            key: i.id,
            parent: i.parent,
            title: i.name,
            path: i.path,
            icon: i.icon,
          }
        })
        setMenuArray(result.data)
      } else {
        // 无菜单数据，退回登录
      }
    })
  }

  // 菜单结构
  const menuTree = useMemo(() => {
    // 提取一级菜单
    let topMenu: MItem[] = []
    menuArray.forEach((item: any) => {
      if (!item.parent) topMenu.push(item)
    })
    // 提取二级菜单
    let subMenu: MItem[] = []
    topMenu.forEach((parent: MItem) => {
      parent.children = []
      menuArray.forEach((item: any) => {
        if (item.parent === parent.key) {
          parent.children?.push(item)
          subMenu.push(item)
        }
      })
    })
    // 提取三级菜单
    subMenu.forEach((parent: MItem) => {
      parent.children = []
      menuArray.forEach((item: any) => {
        if (item.parent === parent.key) {
          parent.children?.push(item)
        }
      })
    })
    return topMenu
  }, [menuArray])
  // 面包屑菜单
  const breadcrumb = useMemo(() => {
    let list: MItem[] = []
    // 检查当前路径是否在列表中
    if (location.pathname) {
      menuArray.forEach((item: MItem) => {
        if (item.path && location.pathname.indexOf(item.path) === 0) {
          list.push(item)
          let parent = item.parent
          while (parent) {
            let parentItem = menuArray.find((i) => parent === i.key)
            if (parentItem) {
              list.push(parentItem)
              parent = parentItem.parent
            }
          }
        }
      })
    }
    return list.reverse()
  }, [menuArray, location.pathname])
  // 导航菜单
  const navMenu = useMemo(() => {
    let topKey = topMenu ? topMenu.key : breadcrumb[0]?.key
    let currentKey = breadcrumb[breadcrumb.length - 1]?.key
    let topNode = menuTree.find((i: MItem) => i.key === topKey)
    return (
      topNode && (
        <Paper elevation={5}>
          <List component="nav">
            {topNode.children?.map((i: MItem) => (
              <Box key={i.key}>
                <ListItem selected={i.key === currentKey} className={classes.menuItem} button onClick={() => (i.children ? setExpandMenu(i.key) : i.path && history.push(i.path))}>
                  {iconMenu ? (
                    <Icon name={i.icon} />
                  ) : (
                    <>
                      <ListItemIcon className={classes.menuItemIcon}>
                        <Icon name={i.icon} />
                      </ListItemIcon>
                      <ListItemText primary={i.title} />
                      {i.children && <Icon name={expandMenu === i.key ? 'ExpandLess' : 'ExpandMore'} />}
                    </>
                  )}
                </ListItem>
                {i.children && (
                  <Collapse in={expandMenu === i.key} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {i.children.map((i: MItem) => (
                        <ListItem key={i.key} button selected={i.key === currentKey} className={classes.menuItem} onClick={() => i.path && history.push(i.path)}>
                          {iconMenu ? (
                            <Icon color="action" name={i.icon} />
                          ) : (
                            <>
                              <ListItemIcon>
                                <Icon name={i.icon} />
                              </ListItemIcon>
                              <ListItemText primary={i.title} />
                            </>
                          )}
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </Box>
            ))}
          </List>
        </Paper>
      )
    )
  }, [topMenu, breadcrumb, iconMenu, expandMenu])
  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton edge="start" className={classes.logo} color="inherit" onClick={() => setIconMenu(!iconMenu)}>
            <Icon name={iconMenu ? 'MenuOpen' : 'Menu'} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            管理终端
          </Typography>
          {menuTree.map((i: MItem) => (
            <Button color="inherit" startIcon={<Icon name={i.icon} />} onClick={() => setTopMenu(i)} key={i.key}>
              {i.title}
            </Button>
          ))}
          <Button color="inherit" startIcon={<Icon name="AccountCircle" />} onClick={(e) => setUserMenuAnchor(e.currentTarget)}>
            {user?.name}
          </Button>
        </Toolbar>
      </AppBar>
      <Box className={classes.main}>
        <Box className={iconMenu ? classes.iconMenu : classes.menu}>{navMenu}</Box>
        <Box className={classes.content}>
          <Switch>
            <Route path={`${match.path}/base/user`} component={React.lazy(() => import('./base/user/layout'))} />
          </Switch>
          {breadcrumb.length > 0 ? props.children : undefined}
        </Box>
      </Box>
      <Menu anchorEl={userMenuAnchor} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={userMenuAnchor !== null} onClose={() => setUserMenuAnchor(null)}>
        <MenuItem
          onClick={() => {
            setModal(<UploadPassword onCancel={() => setModal(undefined)} />)
            setUserMenuAnchor(null)
          }}
        >
          修改密码
        </MenuItem>
        <MenuItem
          onClick={() => {
            logoutRequest()
            setUserMenuAnchor(null)
          }}
        >
          退出登录
        </MenuItem>
      </Menu>
      {modal}
    </>
  )
}
