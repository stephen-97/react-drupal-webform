import React from 'react'
import { components } from '@/lib/const/const.form'
import styles from './custom.module.scss'
import { IErrorMessageWebformProps } from '@/lib/types/components/errorMessage'
const ErrorMessageCustom = ({
  message,
  ...props
}: IErrorMessageWebformProps) => {
  return (
    <components.ErrorFieldMessageWebform
      className={styles.errorFieldMessage}
      {...props}
    >
      {message}
    </components.ErrorFieldMessageWebform>
  )
}

export default ErrorMessageCustom
