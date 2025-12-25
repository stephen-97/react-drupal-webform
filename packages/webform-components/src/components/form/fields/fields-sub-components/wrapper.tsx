import React from 'react'
import cn from 'classnames'
import styles from './wrapper.module.scss'
import { IWrapperWebformProps } from "../../../../lib/types/components/wrapper"
import { getWrapperCategory } from "../../../../lib/functions/webform_fields_functions/webform_fields_functions"
import { TDrupal_FieldType } from "../../../../lib/types/components/field"
import WrapperLabel from "./wrapper-sub-components/wrapperLabel"
import WrapperField from "./wrapper-sub-components/wrapperField"
import WrapperDescription from "./wrapper-sub-components/wrapperDescription"
import WrapperMore from "./wrapper-sub-components/wrapperMore"
import WrapperManagedFileInfo from "./wrapper-sub-components/wrapperManagedFileInfo"

const Wrapper = (props: IWrapperWebformProps) => {
  const {
    children,
    field,
    classNames,
    isLabel = true,
    stateError,
    components,
    fieldKey,
    innerPropsLabelComponent,
    wrapperElement = 'div',
  } = props

  const CustomWrapper = components?.wrapper
  if (CustomWrapper) {
    return <CustomWrapper {...props}>{children}</CustomWrapper>
  }

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
        stateError={stateError}
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

export default React.memo(Wrapper)
