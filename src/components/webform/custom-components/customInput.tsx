'use client'

import React, { useRef } from 'react'
import styles from './customInput.module.scss'
import { useController, useFormContext } from 'react-hook-form'
import cn from 'classnames'
import { components } from '../../../../packages/react-drupal-webform/src/lib/const/const.form'
import { InputProps } from '../../../../packages/react-drupal-webform/src/lib/types/components/input'

const CustomInput = (props: InputProps) => {
  const { field, fieldKey } = props

  const { control } = useFormContext()

  const {
    field: fieldController,
    fieldState: { error },
  } = useController<any>({
    name: fieldKey,
    control,
  })

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleClear = () => {
    fieldController.onChange('')
    inputRef.current?.focus()
  }

  return (
    <div
      className={cn(styles.inputCustomContainer, {
        [styles.error]: error,
      })}
    >
      <components.Input
        {...props}
        className={styles.inputCustom}
        innerRef={(el) => {
          inputRef.current = el
        }}
      />
      <button
        className={styles.clearButton}
        type="button"
        aria-label={`clear the field "${field?.['#title']}"`}
        onClick={handleClear}
      />
    </div>
  )
}

export default CustomInput
