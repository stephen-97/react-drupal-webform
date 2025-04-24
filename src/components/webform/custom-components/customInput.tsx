import React, { HTMLInputTypeAttribute } from 'react'
import { components } from '@/lib/const/const.form'
import { TFieldObjCustom } from '@/components/webform/form/fields/fields-special-components/fieldObjCustom'
import cn from 'classnames'
import styles from './custom.module.scss'
const CustomInput = (props: TFieldObjCustom) => {
  const { field, fieldController, fieldState, onBlur } = props
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

  return (
    <components.Input {...props}>
      <input
        className={cn(styles.input, {
          [styles.fieldError]: fieldState.error,
        })}
        name={fieldController.name}
        minLength={field?.['#minlength']}
        maxLength={field?.['#maxlength']}
        placeholder={field?.['#placeholder']}
        type={getFieldType}
        onChange={(e) => fieldController.onChange?.(e)}
        value={fieldController?.value ?? ''}
        onBlur={onBlur}
      />
    </components.Input>
  )
}
export default CustomInput
