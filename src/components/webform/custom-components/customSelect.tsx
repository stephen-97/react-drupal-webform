'use client'

import React from 'react'
import styles from './customSelect.module.scss'
import { TFieldWebformObjCustom } from '../../../../packages/react-drupal-webform/src/lib/types/components/fieldWebformObjCustom'
import { useController, useFormContext } from 'react-hook-form'
import cn from 'classnames'

const CustomSelect = (props: TFieldWebformObjCustom) => {
  const { field, fieldKey } = props
  const { control } = useFormContext()

  const {
    field: fieldController,
    fieldState: { error },
  } = useController<any>({
    name: fieldKey,
    control,
  })

  const options = field?.['#options'] ?? {}

  return (
    <div
      className={cn(styles.selectCustomContainer, { [styles.error]: error })}
    >
      <select
        className={styles.selectCustom}
        value={fieldController.value ?? ''}
        onChange={(e) => fieldController.onChange(e.target.value)}
      >
        <option value="">
          {field?.['#placeholder'] ?? 'Select an option'}
        </option>

        {Object.entries(options).map(([value, label]) => (
          <option key={value} value={value}>
            {String(label)}
          </option>
        ))}
      </select>

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
