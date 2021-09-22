import React from 'react'
import { styled } from '@mui/material/styles'
import Link from '@mui/material/Link'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Icon from '../icon/icon'
import { Model } from '../../index'

const Badge = styled(Chip)({
  width: 8,
  height: 8,
})

const UserAvatar = styled(Avatar)({
  width: 30,
  height: 30,
})

const renderBool = (value?: boolean | null) => {
  return value === undefined || value === null ? <Badge color="default" /> : value ? <Icon color="disabled" name="Check" /> : <Icon color="disabled" name="Close" />
}

const renderSex = (value?: boolean | null) => {
  return value === undefined || value === null ? <Badge color="default" /> : value ? '男' : '女'
}

const renderString = (value?: string | null) => {
  return value === undefined || value === null ? <Badge color="default" /> : value
}

const renderUpload = (value?: string | null) => {
  if (value === undefined || value === null || value === '') return <Badge color="default" />
  else {
    if ('http' === value.substring(0, 4))
      if ('https://thirdwx.qlogo.cn/' === value.substring(0, 25)) return <UserAvatar src={value} />
      else
        return (
          <Link href={value} target="_blank">
            <Icon color="action" name="ImageOutlined" />
          </Link>
        )
    else {
      let ext = value.substring(value.lastIndexOf('.') + 1, value.length)
      if (ext === 'jpg' || ext === 'jpeg' || ext === 'gif' || ext === 'png')
        return (
          <Link href={'/' + value} target="_blank">
            <Icon color="action" name="ImageOutlined" />
          </Link>
        )
      else
        return (
          <Link href={'/' + value} target="_blank">
            <Icon color="action" name="DescriptionOutlined" />
          </Link>
        )
    }
  }
}

const renderUploadArray = (value?: string[] | null) => {
  if (value === undefined || value === null) return <Badge color="default" />
  else {
    return value.map((value) => renderUpload(value))
  }
}

const renderInt = (value?: number | null) => {
  return value === undefined || value === null ? <Badge color="default" /> : value.toString()
}

const renderFloat = (value?: number | null) => {
  return value === undefined || value === null ? <Badge color="default" /> : value.toString()
}

const renderModel = (value?: Model | null) => {
  return value === undefined || value === null ? (
    <Badge color="default" />
  ) : (
    <Tooltip key={value.id} title={value.id || ''}>
      <Chip size="small" label={value.name} />
    </Tooltip>
  )
}

const renderModelArray = (value?: Model[] | null) => {
  return value === undefined || value === null ? <Badge color="default" /> : value.map((v) => renderModel(v))
}

const renderStringArray = (value?: string[] | null) => {
  return value === undefined || value === null ? <Badge color="default" /> : value.map((v, i) => <Chip key={i} size="small" variant="outlined" label={v} />)
}

const renderIntArray = (value?: number[] | null) => {
  return value === undefined || value === null ? <Badge color="default" /> : value.map((v, i) => <Chip key={i} size="small" variant="outlined" label={v} />)
}

const renderFloatArray = (value?: number[] | null) => {
  return value === undefined || value === null ? <Badge color="default" /> : value.map((v, i) => <Chip key={i} size="small" variant="outlined" label={v} />)
}

const renderStringMap = (value?: { [key: string]: string } | null) => {
  if (value === undefined || value === null) return <Badge color="default" />
  else {
    const list = []
    for (let key in value) {
      list.push(
        <Tooltip key={key} title={key}>
          <Chip size="small" label={value[key]} />
        </Tooltip>
      )
    }
    return list
  }
}

const renderStringArrayMap = (value?: { [key: string]: string[] } | null) => {
  if (value === undefined || value === null) return <Badge color="default" />
  else {
    const list = []
    for (let key in value) {
      list.push(
        <Tooltip key={key} title={key}>
          <Chip size="small" label={value[key].join(',')} />
        </Tooltip>
      )
    }
    return list
  }
}

const renderIntMap = (value?: { [key: string]: number } | null) => {
  if (value === undefined || value === null) return <Badge color="default" />
  else {
    const list = []
    for (let key in value) {
      list.push(
        <Tooltip key={key} title={key}>
          <Chip size="small" label={value[key]} />
        </Tooltip>
      )
    }
    return list
  }
}

const renderFloatMap = (value?: { [key: string]: number } | null) => {
  if (value === undefined || value === null) return <Badge color="default" />
  else {
    const list = []
    for (let key in value) {
      list.push(
        <Tooltip key={key} title={key}>
          <Chip size="small" label={value[key]} />
        </Tooltip>
      )
    }
    return list
  }
}

export default {
  renderBool,
  renderSex,
  renderUpload,
  renderUploadArray,
  renderModel,
  renderModelArray,
  renderString,
  renderInt,
  renderFloat,
  renderStringArray,
  renderIntArray,
  renderFloatArray,
  renderStringMap,
  renderStringArrayMap,
  renderIntMap,
  renderFloatMap,
}
