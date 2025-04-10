import cn from 'classnames'
import styles from './wrapper.module.scss'
import { TElementSource } from '@/lib/types/field'
import { ReactElement } from 'react'
import { TWebformClassNameFields, TWebformClassNames } from '@/lib/types/form.d'
import Label from '@/components/webform/form/fields/fields-sub-components/label'
import { FieldError } from 'react-hook-form'
import ErrorFieldMessage from '@/components/webform/form/fields/fields-sub-components/errorFieldMessage/errorFieldMessage'

interface IWrapper {
  children: ReactElement
  isLabel?: boolean
  className?: string
  field: TElementSource
  classNames: Required<TWebformClassNames>
  classNameFieldName: keyof Required<TWebformClassNameFields>
  stateError?: FieldError | undefined
}
const Wrapper = ({
  children,
  field,
  classNames,
  isLabel = true,
  stateError = undefined,
  classNameFieldName,
}: IWrapper) => {
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
        <Label
          className={classNames.general.fieldLabel}
          title={field['#title']}
        />
      )}
      {children}
      {typeof stateError?.message === 'string' &&
        stateError.message.length > 0 && (
          <ErrorFieldMessage
            className={classNames.states?.fieldErrorMessage}
            message={stateError.message}
          />
        )}
    </div>
  )
}

export default Wrapper
