import React from 'react'
import cn from 'classnames'
import styles from './fieldContainer.module.scss'
import { FieldContainerProps } from '../../../../lib/types/components/fieldContainer'
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
    type: field['#type'],
    component: 'fieldContainer',
  })

  const isRequired = Boolean(field?.['#required'])
  const hasError = Boolean(stateError)

  const componentClassNames = getClassNames({
    name: 'fieldContainer',
    prefix: classNamePrefix,
    modifiers: {
      required: isRequired,
      'has-error': hasError,
    },
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
          classNamePrefix={classNamePrefix}
          field={field}
          fieldKey={fieldKey}
        />
      )}
      <WrapperField
        field={field}
        classNames={classNames}
        components={components}
        fieldKey={fieldKey}
        classNamePrefix={classNamePrefix}
      >
        {children}
      </WrapperField>
      {(field?.['#description'] || field?.['#file_placeholder']) && (
        <WrapperDescription
          field={field}
          fieldKey={fieldKey}
          classNames={classNames}
          classNamePrefix={classNamePrefix}
          components={components}
        />
      )}
      {field['#type'] === 'managed_file' && (
        <WrapperManagedFileInfo
          fieldKey={fieldKey}
          field={field}
          components={components}
          classNamePrefix={classNamePrefix}
        />
      )}
      {field?.['#more'] && field?.['#more_title'] && (
        <WrapperMore
          field={field}
          fieldKey={fieldKey}
          classNamePrefix={classNamePrefix}
          classNames={classNames}
          components={components}
        />
      )}
    </WrapperElement>
  )
}

export default React.memo(FieldContainer)
