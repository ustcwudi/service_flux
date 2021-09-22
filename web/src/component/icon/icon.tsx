import React, { useState } from 'react'
import Block from '@mui/icons-material/Block'
import Menu from '@mui/icons-material/Menu'
import MenuOpen from '@mui/icons-material/MenuOpen'
import AccountCircle from '@mui/icons-material/AccountCircle'
import CardGiftcard from '@mui/icons-material/CardGiftcard'
import Apps from '@mui/icons-material/Apps'
import Settings from '@mui/icons-material/Settings'
import Lock from '@mui/icons-material/Lock'
import CalendarViewDay from '@mui/icons-material/CalendarViewDay'
import CloudUpload from '@mui/icons-material/CloudUpload'
import RecentActors from '@mui/icons-material/RecentActors'
import People from '@mui/icons-material/People'
import MenuBook from '@mui/icons-material/MenuBook'
import LocalFlorist from '@mui/icons-material/LocalFlorist'
import Assignment from '@mui/icons-material/Assignment'
import TableChart from '@mui/icons-material/TableChart'
import FontDownload from '@mui/icons-material/FontDownload'
import Group from '@mui/icons-material/Group'
import GroupWork from '@mui/icons-material/GroupWork'
import AccountBalance from '@mui/icons-material/AccountBalance'
import AccountBox from '@mui/icons-material/AccountBox'
import Input from '@mui/icons-material/Input'
import VerifiedUser from '@mui/icons-material/VerifiedUser'
import Chat from '@mui/icons-material/Chat'
import Print from '@mui/icons-material/Print'
import DynamicFeed from '@mui/icons-material/DynamicFeed'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Add from '@mui/icons-material/Add'
import AddCircle from '@mui/icons-material/AddCircle'
import Search from '@mui/icons-material/Search'
import Send from '@mui/icons-material/Send'
import Refresh from '@mui/icons-material/Refresh'
import Publish from '@mui/icons-material/Publish'
import Delete from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'
import Replay from '@mui/icons-material/Replay'
import Close from '@mui/icons-material/Close'
import Cancel from '@mui/icons-material/Cancel'
import Check from '@mui/icons-material/Check'
import HelpOutline from '@mui/icons-material/HelpOutline'
import Telegram from '@mui/icons-material/Telegram'
import ImageOutlined from '@mui/icons-material/ImageOutlined'
import DeleteOutline from '@mui/icons-material/DeleteOutline'
import DeleteForever from '@mui/icons-material/DeleteForever'
import SettingsBackupRestore from '@mui/icons-material/SettingsBackupRestore'
import DescriptionOutlined from '@mui/icons-material/DescriptionOutlined'
import ChevronRight from '@mui/icons-material/ChevronRight'
import ArrowRightRounded from '@mui/icons-material/ArrowRightRounded'

export default (props: any) => {
  switch (props.name) {
    case 'Replay':
      return <Replay color={props.color} className={props.classes?.icon} />
    case 'Telegram':
      return <Telegram color={props.color} className={props.classes?.icon} />
    case 'Close':
      return <Close color={props.color} className={props.classes?.icon} />
    case 'Cancel':
      return <Cancel color={props.color} className={props.classes?.icon} />
    case 'Check':
      return <Check color={props.color} className={props.classes?.icon} />
    case 'HelpOutline':
      return <HelpOutline color={props.color} className={props.classes?.icon} />
    case 'ImageOutlined':
      return <ImageOutlined color={props.color} className={props.classes?.icon} />
    case 'DescriptionOutlined':
      return <DescriptionOutlined color={props.color} className={props.classes?.icon} />
    case 'CloudUpload':
      return <CloudUpload color={props.color} className={props.classes?.icon} />
    case 'Edit':
      return <Edit color={props.color} className={props.classes?.icon} />
    case 'DeleteForever':
      return <DeleteForever color={props.color} className={props.classes?.icon} />
    case 'SettingsBackupRestore':
      return <SettingsBackupRestore color={props.color} className={props.classes?.icon} />
    case 'DeleteOutline':
      return <DeleteOutline color={props.color} className={props.classes?.icon} />
    case 'Delete':
      return <Delete color={props.color} className={props.classes?.icon} />
    case 'Publish':
      return <Publish color={props.color} className={props.classes?.icon} />
    case 'Add':
      return <Add color={props.color} className={props.classes?.icon} />
    case 'AddCircle':
      return <AddCircle color={props.color} className={props.classes?.icon} />
    case 'Search':
      return <Search color={props.color} className={props.classes?.icon} />
    case 'Send':
      return <Send color={props.color} className={props.classes?.icon} />
    case 'Refresh':
      return <Refresh color={props.color} className={props.classes?.icon} />
    case 'Menu':
      return <Menu color={props.color} className={props.classes?.icon} />
    case 'MenuOpen':
      return <MenuOpen color={props.color} className={props.classes?.icon} />
    case 'AccountCircle':
      return <AccountCircle color={props.color} className={props.classes?.icon} />
    case 'CardGiftcard':
      return <CardGiftcard color={props.color} className={props.classes?.icon} />
    case 'Apps':
      return <Apps color={props.color} className={props.classes?.icon} />
    case 'Settings':
      return <Settings color={props.color} className={props.classes?.icon} />
    case 'Lock':
      return <Lock color={props.color} className={props.classes?.icon} />
    case 'CalendarViewDay':
      return <CalendarViewDay color={props.color} className={props.classes?.icon} />
    case 'RecentActors':
      return <RecentActors color={props.color} className={props.classes?.icon} />
    case 'People':
      return <People color={props.color} className={props.classes?.icon} />
    case 'MenuBook':
      return <MenuBook color={props.color} className={props.classes?.icon} />
    case 'LocalFlorist':
      return <LocalFlorist color={props.color} className={props.classes?.icon} />
    case 'Assignment':
      return <Assignment color={props.color} className={props.classes?.icon} />
    case 'TableChart':
      return <TableChart color={props.color} className={props.classes?.icon} />
    case 'FontDownload':
      return <FontDownload color={props.color} className={props.classes?.icon} />
    case 'Group':
      return <Group color={props.color} className={props.classes?.icon} />
    case 'GroupWork':
      return <GroupWork color={props.color} className={props.classes?.icon} />
    case 'AccountBalance':
      return <AccountBalance color={props.color} className={props.classes?.icon} />
    case 'AccountBox':
      return <AccountBox color={props.color} className={props.classes?.icon} />
    case 'Input':
      return <Input color={props.color} className={props.classes?.icon} />
    case 'VerifiedUser':
      return <VerifiedUser color={props.color} />
    case 'Chat':
      return <Chat color={props.color} className={props.classes?.icon} />
    case 'Print':
      return <Print color={props.color} className={props.classes?.icon} />
    case 'DynamicFeed':
      return <DynamicFeed color={props.color} className={props.classes?.icon} />
    case 'ExpandLess':
      return <ExpandLess color={props.color} className={props.classes?.icon} />
    case 'ExpandMore':
      return <ExpandMore color={props.color} className={props.classes?.icon} />
    case 'ChevronRight':
      return <ChevronRight color={props.color} className={props.classes?.icon} />
    case 'ArrowRightRounded':
      return <ArrowRightRounded color={props.color} className={props.classes?.icon} />
    default:
      return <Block color={props.color} className={props.classes?.icon} />
  }
}
