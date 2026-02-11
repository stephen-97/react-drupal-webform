'use client'

import React from 'react'
import { SelectProps } from '../../../../packages/react-drupal-webform/src/lib/types/components/select'
import { useController, useFormContext } from 'react-hook-form'
import styles from './customSelect.module.scss'
import cn from 'classnames'
import Select from '../../../../packages/react-drupal-webform/src/components/form/fields/fields-elements/select'

const CustomSelect = (props: SelectProps) => {
  const { fieldKey, field } = props
  const { control } = useFormContext()

  const controller = useController<any>({ name: fieldKey, control })

  const options = field?.['#options']

  const {
    field: fieldController,
    fieldState: { error },
  } = controller

  return (
    <div
      className={cn(styles.selectCustomContainer, { [styles.error]: error })}
    >
      <Select
        innerProps={{
          ...props.innerProps,
        }}
        className={styles.selectCustom}
        {...props}
      ></Select>
      <span
        className={cn(styles.selectValue, {
          [styles.placeholder]: !fieldController.value,
        })}
      >
        {fieldController.value
          ? options[fieldController.value]
          : (field?.['#placeholder'] ?? 'Select an option')}
      </span>
    </div>
  )
}

export default React.memo(CustomSelect)
