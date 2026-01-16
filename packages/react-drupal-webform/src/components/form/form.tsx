import React from 'react'
import { FormProps } from '../../lib/types/components/form'
import cn from 'classnames'
import styles from './form.module.scss'

const Form = ({ children, onSubmit, className, innerProps }: FormProps) => {
  return (
    <form
      className={cn(styles.form, className)}
      onSubmit={onSubmit}
      {...innerProps}
    >
      {children}
    </form>
  )
}

export default Form
