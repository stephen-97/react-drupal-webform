import React, { HTMLInputTypeAttribute } from 'react'
import cn from 'classnames'
import styles from './field.module.scss'
import { useController, useFormContext } from 'react-hook-form'
import { TFieldWebformObj } from '../../../lib/types/components/field'
import Wrapper from './fields-sub-components/wrapper'

const renderInput = (props: TFieldWebformObj) => {
  const { fieldKey, field, components, classNames, onBlur } = props
  const { control } = useFormContext()

  const CustomInput = components?.fieldById?.[fieldKey] ?? components?.input

  const controller = useController<any>({ name: fieldKey, control })
  const { field: fieldController, fieldState } = controller

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
    <Wrapper
      field={field}
      classNames={classNames}
      classNameFieldName="fieldInput"
      stateError={fieldState?.error}
      components={components}
      key={fieldKey}
      fieldKey={fieldKey}
    >
      {CustomInput ? (
        <CustomInput {...props} />
      ) : (
        <input
          id={fieldKey}
          className={cn(
            classNames.fields.textInputs.base,
            classNames.fields.textInputs.types[
              field?.[
                '#type'
              ] as keyof typeof classNames.fields.textInputs.types
            ],
            styles.input,
            styles[field?.['#type']],
            { [styles.error]: fieldState?.error }
          )}
          name={fieldController.name}
          minLength={field?.['#minlength']}
          maxLength={field?.['#maxlength']}
          placeholder={field?.['#placeholder']}
          type={getFieldType}
          onChange={(e) => fieldController.onChange(e)}
          value={fieldController.value ?? ''}
          onBlur={onBlur}
          required={field?.['#required']}
        />
      )}
    </Wrapper>
  )
}

export default renderInput
