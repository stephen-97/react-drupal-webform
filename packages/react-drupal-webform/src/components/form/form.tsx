import React from 'react'
import { FormProps } from '../../lib/types/components/form'
import cn from 'classnames'
import styles from './form.module.scss'
import { getClassNames } from '../../lib/functions/utils_functions'

const Form = (props: FormProps) => {
  const {
    children,
    onSubmit,
    className,
    innerProps,
    classNamePrefix,
    unstyled,
    validationMode,
    disableActionButtonWhenInvalid,
  } = props

  const isHtmlNative = validationMode === 'htmlNative'

  const formClassName = getClassNames({
    name: 'form',
    prefix: classNamePrefix,
    unstyled: unstyled,
    classNameComponent: className,
    baseCn: cn(styles.form),
  })

  return (
    <form
      className={formClassName}
      onSubmit={onSubmit}
      noValidate={!isHtmlNative}
      {...innerProps}
    >
      {children}
    </form>
  )
}

export default Form
