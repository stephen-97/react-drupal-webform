import { TFieldWebformObj } from '../../../lib/types/components/field'
import FieldContainer from './fields-sub-components/fieldContainer'
import Checkbox from './fields-elements/checkbox'
import Title from './fields-sub-components/title/title'
import React from 'react'
import styles from '../fields/field.module.scss'

export const renderCheckbox = (props: TFieldWebformObj) => {
  const { fieldKey, field, classNames, components } = props

  const FieldContainerComponent = components?.fieldContainer ?? FieldContainer

  const CustomCheckbox =
    components?.fieldById?.[fieldKey] ?? components?.checkbox

  const CustomLabel = components?.title ?? Title
  const title = field?.['#title']

  return (
    <FieldContainerComponent
      field={field}
      classNames={classNames}
      classNameFieldName="fieldCheckboxes"
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
    </FieldContainerComponent>
  )
}
