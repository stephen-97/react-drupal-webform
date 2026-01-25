import React from 'react'
import { WrapperFieldProps } from '../../../../../lib/types/components/wrapperField'
import styles from '../fieldContainer.module.scss'
import ErrorFieldMessage from '../errorFieldMessage/errorFieldMessage'

const WrapperField = ({
  components,
  classNames,
  field,
  children,
  fieldKey,
  classNamePrefix,
  unstyled,
}: WrapperFieldProps) => {
  const ErrorFieldMessageComponent =
    components?.errorFieldMessage ?? ErrorFieldMessage

  return (
    <>
      {field?.['#field_prefix'] || field?.['#field_suffix'] ? (
        <div className={styles.prefixSuffixContainer}>
          {field?.['#field_prefix'] && <span>{field['#field_prefix']}</span>}
          <div className={styles.fieldContainer}>
            {children}
            <ErrorFieldMessageComponent
              classNamePrefix={classNamePrefix}
              classNames={classNames}
              field={field}
              fieldKey={fieldKey}
              components={components}
              unstyled={unstyled}
            />
          </div>
          {field?.['#field_suffix'] && <span>{field['#field_suffix']}</span>}
        </div>
      ) : (
        <>
          {children}
          <ErrorFieldMessageComponent
            classNamePrefix={classNamePrefix}
            classNames={classNames}
            field={field}
            fieldKey={fieldKey}
            components={components}
            unstyled={unstyled}
          />
        </>
      )}
    </>
  )
}

export default React.memo(WrapperField)
