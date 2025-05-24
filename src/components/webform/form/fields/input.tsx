import React, { HTMLInputTypeAttribute } from 'react'

import cn from 'classnames'
import styles from './field.module.scss'
import { useController } from 'react-hook-form'
import { TFieldObj } from '@/lib/types/components/field'
import Wrapper from '@/components/webform/form/fields/fields-sub-components/wrapper'

const renderInput = (props: TFieldObj) => {
  const { control, key, field, components, classNames, onBlur } = props

  const { key: _, ...restProps } = props

  const { field: fieldController, fieldState } = useController<any>({
    name: key,
    control,
  })

  const CustomInput = components?.input

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
      classNameFieldName={'fieldInput'}
      stateError={fieldState.error}
      components={components}
      key={key}
      fieldKey={key}
    >
      {CustomInput ? (
        <CustomInput
          fieldController={fieldController}
          fieldState={fieldState}
          {...restProps}
        />
      ) : (
        <input
          id={key}
          className={cn(
            classNames.fields.textInputs.base,
            classNames.fields.textInputs.types[
              field?.[
                '#type'
              ] as keyof typeof classNames.fields.textInputs.types
            ],
            styles.input,
            styles[field?.['#type']],
            {
              [styles.error]: fieldState.error,
            }
          )}
          name={fieldController.name}
          minLength={field?.['#minlength']}
          maxLength={field?.['#maxlength']}
          placeholder={field?.['#placeholder']}
          type={getFieldType}
          onChange={(e) => fieldController.onChange?.(e)}
          value={fieldController?.value ?? ''}
          onBlur={onBlur}
          required={field?.['#required']}
        />
      )}
    </Wrapper>
  )
}

export default renderInput
