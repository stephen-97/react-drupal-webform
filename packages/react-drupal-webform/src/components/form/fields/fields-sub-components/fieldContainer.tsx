import React from 'react'
import cn from 'classnames'
import styles from './fieldContainer.module.scss'
import { FieldContainerProps } from '../../../../lib/types/components/fieldContainer'
import { getWrapperCategory } from '../../../../lib/functions/webform_fields_functions/webform_fields_functions'
import { TDrupal_FieldType } from '../../../../lib/types/components/field'
import WrapperField from './wrapper-sub-components/wrapperField'
import WrapperDescription from './wrapper-sub-components/wrapperDescription'
import WrapperMore from './wrapper-sub-components/wrapperMore'
import WrapperManagedFileInfo from './wrapper-sub-components/wrapperManagedFileInfo'
import Title from './title/title'
import { useController, useFormContext } from 'react-hook-form'
import {
  getClassNames,
  getDataAttributes,
} from '../../../../lib/functions/utils_functions'

const FieldContainer = (props: FieldContainerProps) => {
  const {
    children,
    field,
    classNames,
    isLabel = true,
    components,
    fieldKey,
    wrapperElement = 'div',
    innerProps,
    className,
    classNamePrefix,
  } = props

  const TitleComponent = components?.title ?? Title

  const WrapperElement = wrapperElement ?? 'div'

  const labelWrapperElement =
    field?.['#type'] === 'checkboxes' || field?.['#type'] === 'radios'
      ? 'legend'
      : 'label'

  const { control } = useFormContext()

  const { fieldState } = useController<any>({
    name: fieldKey,
    control,
  })

  const stateError = fieldState?.error

  const dataAttributes = getDataAttributes({
    hasError: Boolean(stateError),
    type: field['#type'],
    component: 'fieldContainer',
  })

  const componentClassNames = getClassNames({
    name: 'fieldContainer',
    prefix: classNamePrefix,
    baseCn: cn(
      styles.fieldWrapper,
      {
        [styles.fieldWrapperCheckbox]: field?.['#type'] === 'checkbox',
      },
      className
    ),
  })

  return (
    <WrapperElement
      className={componentClassNames}
      {...dataAttributes}
      {...(innerProps as any)}
    >
      {isLabel && field?.['#title'] && (
        <TitleComponent
          wrapperElement={labelWrapperElement}
          components={components}
          classNames={classNames}
          field={field}
          fieldKey={fieldKey}
        />
      )}
      <WrapperField
        field={field}
        classNames={classNames}
        components={components}
        stateError={stateError}
        fieldKey={fieldKey}
      >
        {children}
      </WrapperField>
      {(field?.['#description'] || field?.['#file_placeholder']) && (
        <WrapperDescription
          field={field}
          classNames={classNames}
          components={components}
        />
      )}
      {field['#type'] === 'managed_file' && (
        <WrapperManagedFileInfo field={field} components={components} />
      )}
      {field?.['#more'] && field?.['#more_title'] && (
        <WrapperMore
          fieldMore={field['#more']}
          fieldMoreTitle={field['#more_title']}
          classNames={classNames}
          components={components}
        />
      )}
    </WrapperElement>
  )
}

export default React.memo(FieldContainer)
