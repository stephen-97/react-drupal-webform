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
    isLabel = true,
    components,
    fieldKey,
    wrapperElement = 'div',
    innerProps,
    className,
    classNamePrefix,
    unstyled,
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
    unstyled: unstyled,
    modifiers: {
      required: isRequired,
      'has-error': hasError,
    },
    classNameComponent: className,
    baseCn: cn(styles.fieldWrapper, {
      [styles.fieldWrapperCheckbox]: field?.['#type'] === 'checkbox',
    }),
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
          classNamePrefix={classNamePrefix}
          field={field}
          fieldKey={fieldKey}
          unstyled={unstyled}
        />
      )}
      <WrapperField
        field={field}
        components={components}
        fieldKey={fieldKey}
        classNamePrefix={classNamePrefix}
        unstyled={unstyled}
      >
        {children}
      </WrapperField>
      {(field?.['#description'] || field?.['#file_placeholder']) && (
        <WrapperDescription
          field={field}
          fieldKey={fieldKey}
          classNamePrefix={classNamePrefix}
          components={components}
          unstyled={unstyled}
        />
      )}
      {field['#type'] === 'managed_file' && (
        <WrapperManagedFileInfo
          fieldKey={fieldKey}
          field={field}
          components={components}
          classNamePrefix={classNamePrefix}
          unstyled={unstyled}
        />
      )}
      {field?.['#more'] && field?.['#more_title'] && (
        <WrapperMore
          field={field}
          fieldKey={fieldKey}
          classNamePrefix={classNamePrefix}
          components={components}
          unstyled={unstyled}
        />
      )}
    </WrapperElement>
  )
}

export default React.memo(FieldContainer)
