import React from 'react'
import styles from './errorFieldMessage.module.scss'
import cn from 'classnames'

interface IErrorMessage {
  message: string
  className?: string
}
const ErrorFieldMessage = ({ message, className }: IErrorMessage) => {
  return (
    <label className={cn(className, styles.errorFieldMessage)}>{message}</label>
  )
}

export type { IErrorMessage }

export default ErrorFieldMessage
