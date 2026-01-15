import React from 'react'
import { TWrapperFieldWebformProps } from '../../../../../lib/types/components/wrapperField'
import styles from '../wrapper.module.scss'
import ErrorFieldMessage from '../errorFieldMessage/errorFieldMessage'

const WrapperField = ({
  components,
  classNames,
  field,
  children,
  stateError,
  fieldKey,
}: TWrapperFieldWebformProps) => {
  const ErrorFieldMessageComponent =
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
                <ErrorFieldMessageComponent
                  classNames={classNames}
                  field={field}
                  fieldKey={fieldKey}
                  components={components}
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
              <ErrorFieldMessageComponent
                classNames={classNames}
                field={field}
                fieldKey={fieldKey}
                components={components}
                message={stateError.message}
              />
            )}
        </>
      )}
    </>
  )
}

export default React.memo(WrapperField)
