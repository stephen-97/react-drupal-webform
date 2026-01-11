import { useController, useFormContext } from 'react-hook-form'
import { TFieldWebformObj } from '../../../lib/types/components/field'
import Wrapper from './fields-sub-components/wrapper'
import cn from 'classnames'
import styles from './field.module.scss'
import WrapperLabel from './fields-sub-components/wrapper-sub-components/wrapperLabel'
import React from 'react'

export const renderCheckbox = (props: TFieldWebformObj) => {
  const { onBlur, fieldKey, field, classNames, components } = props
  const title = field?.['#title']
  const isRequired = Boolean(field?.['#required'])

  const { control } = useFormContext()

  const CustomCheckbox =
    components?.fieldById?.[fieldKey] ?? components?.checkbox

  const controller = useController<any>({ name: fieldKey, control })
  const { field: fieldController, fieldState } = controller

  return (
    <Wrapper
      field={field}
      classNames={classNames}
      classNameFieldName="fieldCheckboxes"
      stateError={fieldState?.error}
      key={fieldKey}
      isLabel={false}
      components={components}
      fieldKey={fieldKey}
    >
      {CustomCheckbox ? (
        <CustomCheckbox {...props} />
      ) : (
        <div
          className={cn(
            classNames.fields.checkbox?.itemWrapper,
            styles.checkbox
          )}
        >
          <input
            id={fieldKey}
            className={cn(classNames.fields.checkbox.input)}
            name={fieldController.name}
            type="checkbox"
            value={title}
            checked={Boolean(fieldController.value)}
            onChange={(e) => fieldController.onChange(e.target.checked)}
            onBlur={onBlur}
          />
          {title && (
            <WrapperLabel
              components={components}
              field={field}
              classNames={classNames}
              fieldKey={fieldKey}
            />
          )}
        </div>
      )}
    </Wrapper>
  )
}
