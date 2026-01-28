'use client'

import React from 'react'
import styles from './customInput.module.scss'
import { useController, useFormContext } from 'react-hook-form'
import cn from 'classnames'
import { components } from '../../../../packages/react-drupal-webform/src/lib/const/const.form'
import { InputProps } from '../../../../packages/react-drupal-webform/src/lib/types/components/input'

const CustomInput = (props: InputProps) => {
  const { field, fieldKey } = props

  const { control } = useFormContext()

  const controller = useController<any>({ name: fieldKey, control })

  const {
    field: fieldController,
    fieldState: { error },
  } = controller

  return (
    <div className={cn(styles.inputCustomContainer, { [styles.error]: error })}>
      <components.Input
        className={styles.inputCustom}
        onBlur={() => console.log('onBlur')}
        innerProps={{
          ...props.innerProps,
        }}
        {...props}
      ></components.Input>
      <button
        className={styles.clearButton}
        type={'button'}
        aria-label={`clear the field "${field?.['#title']}"`}
        onClick={() => fieldController.onChange('')}
      ></button>
    </div>
  )
}

export default React.memo(CustomInput)
