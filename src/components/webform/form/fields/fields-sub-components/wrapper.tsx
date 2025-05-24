import React from 'react'
import cn from 'classnames'
import styles from './wrapper.module.scss'
import { IWrapperWebformProps } from '@/lib/types/components/wrapper'
import { getWrapperCategory } from '@/lib/functions/webform_fields_functions/webform_fields_functions'
import { TDrupal_FieldType } from '@/lib/types/components/field'
import WrapperLabel from '@/components/webform/form/fields/fields-sub-components/wrapper-sub-components/wrapperLabel'
import WrapperField from '@/components/webform/form/fields/fields-sub-components/wrapper-sub-components/wrapperField'
import WrapperDescription from '@/components/webform/form/fields/fields-sub-components/wrapper-sub-components/wrapperDescription'
import WrapperMore from '@/components/webform/form/fields/fields-sub-components/wrapper-sub-components/wrapperMore'
import WrapperManagedFileInfo from '@/components/webform/form/fields/fields-sub-components/wrapper-sub-components/wrapperManagedFileInfo'

const DefaultWrapper = ({
  children,
  field,
  classNames,
  isLabel = true,
  stateError = undefined,
  components,
  fieldKey,
  innerPropsLabelComponent,
  wrapperElement = 'div',
}: IWrapperWebformProps) => {
  const wrapperCategory = getWrapperCategory(
    field['#type'] as TDrupal_FieldType
  )

  const WrapperElement = wrapperElement

  return (
    <WrapperElement
      className={cn(
        ...(field?.['#attributes']?.class ?? []),
        classNames.wrappers?.byFieldType?.[field['#type']],
        wrapperCategory
          ? classNames.wrappers?.byCategory?.[wrapperCategory]
          : undefined,
        classNames.wrappers?.base,
        {
          [classNames.states.fieldError ?? '']: Boolean(stateError),
        },
        styles.fieldWrapper
      )}
    >
      {isLabel && field?.['#title'] && (
        <WrapperLabel
          components={components}
          field={field}
          classNames={classNames}
          fieldKey={fieldKey}
          innerPropsLabelComponent={innerPropsLabelComponent}
        />
      )}
      <WrapperField
        field={field}
        classNames={classNames}
        components={components}
        children={children}
      />
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
const Wrapper = (props: IWrapperWebformProps) => {
  const WrapperComponent = props.components?.wrapper ?? DefaultWrapper

  return <WrapperComponent {...props}>{props.children}</WrapperComponent>
}

export { DefaultWrapper }
export default Wrapper
