'use client'

import React, { HTMLInputTypeAttribute } from 'react'
import styles from './custom.module.scss'
import { TFieldWebformObjCustom } from '../../../../packages/react-drupal-webform/src/lib/types/components/fieldWebformObjCustom'
import { useController, useFormContext } from 'react-hook-form'
import cn from 'classnames'

const CustomInput = (props: TFieldWebformObjCustom) => {
  const { field, fieldKey } = props
  const getFieldType: HTMLInputTypeAttribute = (() => {
    switch (field?.['#type']) {
      case 'textfield':
        return 'text'
      case 'date':
        return 'date'
      case 'number':
        return 'number'
      case 'email':
        return 'email'
      case 'tel':
        return 'tel'
      default:
        return 'text'
    }
  })()
  const { control } = useFormContext()

  const controller = useController<any>({ name: fieldKey, control })

  const {
    field: fieldController,
    fieldState: { error },
  } = controller

  return (
    <div className={cn(styles.inputCustomContainer, { [styles.error]: error })}>
      <input
        id={fieldKey}
        className={styles.inputCustom}
        minLength={field?.['#minlength']}
        maxLength={field?.['#maxlength']}
        placeholder={field?.['#placeholder']}
        name={fieldController.name}
        onChange={(e) => fieldController.onChange(e)}
        type={getFieldType}
        value={fieldController.value ?? ''}
      />
      <button
        className={styles.clearButton}
        type={'button'}
        aria-label={`clear the field "${field?.['#title']}"`}
        onClick={() => fieldController.onChange('')}
      ></button>
    </div>
  )
}

export default CustomInput
