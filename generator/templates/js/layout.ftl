import { PropsWithChildren } from 'react'
import ${model.name}Table from './table'

export default (props: PropsWithChildren<any>) => {
  return (
    <>
      <${model.name}Table canSelect="checkbox" />
      {props.children}
    </>
  )
}
