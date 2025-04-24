import React from 'react'
import styles from './errorFieldMessage.module.scss'
import cn from 'classnames'
import { IErrorMessageWebformProps } from '@/lib/types/components/errorMessage'

const ErrorFieldMessage = ({
  message,
  children,
  className,
}: IErrorMessageWebformProps) => {
  return (
    <label className={cn(styles.errorFieldMessage, className)}>
      {message && <span>{message}</span>}
      {children}
    </label>
  )
}

export default ErrorFieldMessage
