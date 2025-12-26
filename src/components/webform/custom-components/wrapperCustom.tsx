import React from 'react'
import styles from './custom.module.scss'
import { IWrapperWebformProps } from '../../../../packages/react-drupal-webform/src/lib/types/components/wrapper'
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
