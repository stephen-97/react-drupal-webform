import React from 'react'
import { components } from '@/lib/const/const.form'
import styles from './custom.module.scss'
import { IWrapperWebformProps } from '@/lib/types/components/wrapper'
import cn from 'classnames'

const WrapperCustom = ({
  className,
  field,
  ...props
}: IWrapperWebformProps) => {
  return (
    <div className={cn(styles.wrapperCustom, className)}>
      <label>{field?.['#title']}</label>
      {props.children}
    </div>
  )
}
export default WrapperCustom
