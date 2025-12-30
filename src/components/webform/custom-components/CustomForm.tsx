import React from 'react'
import cn from 'classnames'
import styles from './custom.module.scss'
import { TWebformCustomElementFormProps } from '../../../../packages/react-drupal-webform/src/lib/types/form.d'
const CustomForm = (props: TWebformCustomElementFormProps) => {
  const { children, onSubmit, classNames } = props

  return (
    <form
      noValidate
      className={cn(styles.customForm, classNames?.general?.fieldForm)}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  )
}

export default React.memo(CustomForm)
