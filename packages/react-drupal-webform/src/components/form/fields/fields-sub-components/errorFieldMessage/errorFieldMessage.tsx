import React from 'react'
import styles from './errorFieldMessage.module.scss'
import cn from 'classnames'
import { ErrorMessageProps } from '../../../../../lib/types/components/errorMessage'
import {
  getClassNames,
  getDataAttributes,
} from '../../../../../lib/functions/utils_functions'

const ErrorFieldMessage = ({
  message,
  children,
  className,
}: ErrorMessageProps) => {
  const wrapperClassNames = getClassNames({
    name: 'errorFieldMessage',
    baseCn: cn(styles.errorFieldMessage, className),
  })

  const messageClassNames = getClassNames({
    name: 'errorFieldMessageText',
  })

  const dataAttributes = getDataAttributes({
    component: 'errorFieldMessage',
  })

  return (
    <div className={wrapperClassNames} {...dataAttributes}>
      {message && <span className={messageClassNames}>{message}</span>}
      {children}
    </div>
  )
}

export default ErrorFieldMessage
