import React from 'react'
import { components } from '@/lib/const/const.form'
import styles from './custom.module.scss'
import { IWrapperWebformProps } from '@/lib/types/components/wrapper'
import cn from 'classnames'

const WrapperCustom = ({ className, ...props }: IWrapperWebformProps) => {
  return (
    <components.WrapperWebform className={cn(styles.wrapperCustom)} {...props}>
      {props.children}
    </components.WrapperWebform>
  )
}
export default WrapperCustom
