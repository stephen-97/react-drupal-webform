import { useController, useFormContext } from 'react-hook-form'
import { TFieldWebformObj } from '../../../lib/types/components/field'
import Wrapper from './fields-sub-components/wrapper'
import Checkbox from './fields-elements/checkbox'
import Title from './fields-sub-components/title/title'
import React from 'react'
import styles from '../fields/field.module.scss'

export const renderCheckbox = (props: TFieldWebformObj) => {
  const { fieldKey, field, classNames, components } = props

  const { control } = useFormContext()

  const CustomCheckbox =
    components?.fieldById?.[fieldKey] ?? components?.checkbox

  const { fieldState } = useController<any>({
    name: fieldKey,
    control,
  })

  const CustomLabel = components?.title ?? Title
  const title = field?.['#title']

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
        <>
          <Checkbox {...props} />
          {title && (
            <CustomLabel
              wrapperElement="label"
              fieldKey={fieldKey}
              components={components}
              classNames={classNames}
              field={field}
              className={styles.checkboxLabel}
            />
          )}
        </>
      )}
    </Wrapper>
  )
}
