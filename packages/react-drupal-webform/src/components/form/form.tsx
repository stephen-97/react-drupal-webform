import React from 'react'
import { FormProps } from '../../lib/types/components/form'
import cn from 'classnames'
import styles from './form.module.scss'
import { getClassNames } from '../../lib/functions/utils_functions'

const Form = ({
  children,
  onSubmit,
  className,
  innerProps,
  classNamePrefix,
  unstyled,
}: FormProps) => {
  const formClassName = getClassNames({
    name: 'markup',
    prefix: classNamePrefix,
    unstyled: unstyled,
    classNameComponent: className,
    baseCn: cn(styles.form),
  })

  return (
    <form className={formClassName} onSubmit={onSubmit} {...innerProps}>
      {children}
    </form>
  )
}

export default Form
