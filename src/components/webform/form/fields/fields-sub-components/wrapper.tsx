import React from 'react'
import cn from 'classnames'
import styles from './wrapper.module.scss'
import Label from '@/components/webform/form/fields/fields-sub-components/label'
import ErrorFieldMessage from '@/components/webform/form/fields/fields-sub-components/errorFieldMessage/errorFieldMessage'
import { IWrapperWebformProps } from '@/lib/types/components/wrapper'

const DefaultWrapper = ({
  children,
  field,
  classNames,
  isLabel = true,
  stateError = undefined,
  classNameFieldName,
  components,
}: IWrapperWebformProps) => {
  const CustomLabel = components?.label ?? Label
  const CustomErrorFieldMessage =
    components?.errorFieldMessage ?? ErrorFieldMessage
  return (
    <div
      className={cn(
        ...(field?.['#attributes']?.class ?? []),
        classNames.types[field['#type']],
        classNames.fields?.[classNameFieldName],
        classNames.general.fieldWrapper,
        {
          [classNames.states.fieldError ?? '']: Boolean(stateError),
        },
        styles.fieldWrapper
      )}
    >
      {isLabel && field?.['#title'] && (
        <CustomLabel
          className={classNames.general.fieldLabel}
          title={field['#title']}
        />
      )}
      {children}
      {typeof stateError?.message === 'string' &&
        stateError.message.length > 0 && (
          <CustomErrorFieldMessage
            className={classNames.states?.fieldErrorMessage}
            message={stateError.message}
          />
        )}
    </div>
  )
}
const Wrapper = ({
  children,
  field,
  classNames,
  isLabel = true,
  stateError = undefined,
  classNameFieldName,
  components,
}: IWrapperWebformProps) => {
  /**
   *
   *   const CustomLabel = components?.label ?? Label
   *   const CustomErrorFieldMessage =
   *     components?.errorFieldMessage ?? ErrorFieldMessage
   */

  const WrapperComponent = components?.wrapper ?? DefaultWrapper

  return (
    <WrapperComponent
      field={field}
      classNames={classNames}
      stateError={stateError}
      classNameFieldName={classNameFieldName}
      isLabel={isLabel}
      components={components}
    >
      {children}
    </WrapperComponent>
  )
}

export { DefaultWrapper }
export default Wrapper
