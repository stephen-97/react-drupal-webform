import React from 'react'
import { components } from '@/lib/const/const.form'
import { TFieldObjCustom } from '@/components/webform/form/fields/fields-special-components/fieldObjCustom'
import cn from 'classnames'
import styles from './custom.module.scss'
const CustomEmail = (props: TFieldObjCustom) => {
  const { field, fieldController, fieldState, onBlur } = props
  return (
    <components.Email {...props}>
      <input
        className={cn(styles.emailCustom, {
          [styles.fieldError]: fieldState.error,
        })}
        name={fieldController.name}
        minLength={field?.['#minlength']}
        maxLength={field?.['#maxlength']}
        placeholder={field?.['#placeholder']}
        type={'email'}
        onChange={(e) => fieldController.onChange?.(e)}
        value={fieldController?.value ?? ''}
        onBlur={onBlur}
      />
    </components.Email>
  )
}
export default CustomEmail
