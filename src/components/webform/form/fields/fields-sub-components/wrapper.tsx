import React from 'react'
import cn from 'classnames'
import styles from './wrapper.module.scss'
import Label from '@/components/webform/form/fields/fields-sub-components/label'
import ErrorFieldMessage from '@/components/webform/form/fields/fields-sub-components/errorFieldMessage/errorFieldMessage'
import { IWrapperWebformProps } from '@/lib/types/components/wrapper'
import Description from '@/components/webform/form/fields/fields-sub-components/description/description'
import More from '@/components/webform/form/fields/fields-sub-components/more/more'

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
          helps={{
            help: field?.['#help'],
            processed_help_title: field?.['#help_title'],
          }}
        />
      )}
      {field?.['#field_prefix'] || field?.['#field_suffix'] ? (
        <div className={styles.prefixSuffixContainer}>
          {field?.['#field_prefix'] && <span>{field['#field_prefix']}</span>}
          {children}
          {field?.['#field_suffix'] && <span>{field['#field_suffix']}</span>}
        </div>
      ) : (
        <>{children}</>
      )}
      {field?.['#description'] && (
        <Description processed={field?.['#description']} />
      )}
      {field?.['#more'] && field?.['#more_title'] && (
        <More
          more={{
            more_title: field['#more_title'],
            processed_more_text: field['#more'],
          }}
        />
      )}
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
