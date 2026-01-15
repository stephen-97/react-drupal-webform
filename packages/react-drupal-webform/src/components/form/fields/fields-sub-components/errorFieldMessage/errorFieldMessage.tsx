import React from 'react'
import styles from './errorFieldMessage.module.scss'
import cn from 'classnames'
import { ErrorMessageProps } from '../../../../../lib/types/components/errorMessage'

const ErrorFieldMessage = ({
  message,
  children,
  className,
  classNames,
}: ErrorMessageProps) => {
  return (
    <div
      className={cn(
        styles.errorFieldMessage,
        classNames.states?.fieldErrorMessage,
        className
      )}
    >
      {message && <span>{message}</span>}
      {children}
    </div>
  )
}

export default ErrorFieldMessage
