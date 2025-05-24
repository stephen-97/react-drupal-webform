import React from 'react'
import { TWrapperFieldWebformProps } from '@/lib/types/components/wrapperField'
import styles from '@/components/webform/form/fields/fields-sub-components/wrapper.module.scss'
import ErrorFieldMessage from '@/components/webform/form/fields/fields-sub-components/errorFieldMessage/errorFieldMessage'

const WrapperField = ({
  components,
  classNames,
  field,
  children,
  stateError,
}: TWrapperFieldWebformProps) => {
  const CustomErrorFieldMessage =
    components?.errorFieldMessage ?? ErrorFieldMessage

  return (
    <>
      {field?.['#field_prefix'] || field?.['#field_suffix'] ? (
        <div className={styles.prefixSuffixContainer}>
          {field?.['#field_prefix'] && <span>{field['#field_prefix']}</span>}
          <div className={styles.fieldContainer}>
            {children}
            {typeof stateError?.message === 'string' &&
              stateError.message.length > 0 && (
                <CustomErrorFieldMessage
                  className={classNames.states?.fieldErrorMessage}
                  message={stateError.message}
                />
              )}
          </div>
          {field?.['#field_suffix'] && <span>{field['#field_suffix']}</span>}
        </div>
      ) : (
        <>
          {children}
          {typeof stateError?.message === 'string' &&
            stateError.message.length > 0 && (
              <CustomErrorFieldMessage
                className={classNames.states?.fieldErrorMessage}
                message={stateError.message}
              />
            )}
        </>
      )}
    </>
  )
}

export default React.memo(WrapperField)
