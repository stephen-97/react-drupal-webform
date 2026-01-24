import React from 'react'
import styles from './errorFieldMessage.module.scss'
import cn from 'classnames'
import { ErrorMessageProps } from '../../../../../lib/types/components/errorMessage'
import {
  getClassNames,
  getDataAttributes,
} from '../../../../../lib/functions/utils_functions'
import { useController, useFormContext } from 'react-hook-form'

const ErrorFieldMessage = ({
  children,
  className,
  fieldKey,
  classNamePrefix,
}: ErrorMessageProps) => {
  const wrapperClassNames = getClassNames({
    name: 'errorFieldMessage',
    prefix: classNamePrefix,
    baseCn: cn(styles.errorFieldMessage, className),
  })

  const messageClassNames = getClassNames({
    name: 'errorFieldMessageText',
    prefix: classNamePrefix,
  })

  const dataAttributes = getDataAttributes({
    component: 'errorFieldMessage',
  })

  const { control } = useFormContext()

  const { fieldState } = useController<any>({
    name: fieldKey,
    control,
  })

  const rawMessage = fieldState?.error?.message
  const message =
    typeof rawMessage === 'string' &&
    rawMessage.trim() !== '' &&
    rawMessage !== '0'
      ? rawMessage
      : null

  if (!message) {
    return null
  }

  return (
    <div className={wrapperClassNames} {...dataAttributes}>
      {message && <span className={messageClassNames}>{message}</span>}
      {children}
    </div>
  )
}

export default ErrorFieldMessage
