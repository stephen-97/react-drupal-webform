import { useController, useFormContext } from 'react-hook-form'
import { TFieldWebformObj } from '../../../lib/types/components/field'
import Wrapper from './fields-sub-components/wrapper'
import cn from 'classnames'
import styles from './field.module.scss'
import WrapperLabel from './fields-sub-components/wrapper-sub-components/wrapperLabel'
import React from 'react'
import Label from './fields-sub-components/label/label'

export const renderCheckbox = (props: TFieldWebformObj) => {
  const { onBlur, fieldKey, field, classNames, components } = props
  const title = field?.['#title']

  const { control } = useFormContext()

  const CustomCheckbox =
    components?.fieldById?.[fieldKey] ?? components?.checkbox

  const controller = useController<any>({ name: fieldKey, control })
  const { field: fieldController, fieldState } = controller

  const CustomLabel = components?.label ?? Label

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
            <CustomLabel
              wrapperElement={'label'}
              fieldKey={fieldKey}
              components={components}
              classNames={classNames}
              field={field}
            />
          )}
        </div>
      )}
    </Wrapper>
  )
}
